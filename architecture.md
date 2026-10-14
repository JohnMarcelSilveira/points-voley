# Software Design Document (SDD) - Copa de Vôlei App

## 1. Visão Geral (System Context)
Aplicação web (SPA) para gerenciamento de jogos e tabela de classificação em tempo real durante um torneio de vôlei de praia, dividido em duas categorias: Feminino (manhã) e Masculino (tarde). O sistema será operado pelos administradores do evento na beira da quadra para atualizar os resultados, que refletirão instantaneamente na classificação.

## 2. Arquitetura (Container Level)
- **Frontend:** React + Vite, estilizado com Tailwind CSS.
- **Backend/Database:** Firebase (Plano Spark).
  - Firestore (Client-side SDK v10) para dados em tempo real.
  - Firebase Authentication (Google Social Login) para controle de acesso.
- **Hospedagem:** Firebase Hosting.
- **Restrição:** Sem uso de Cloud Functions ou banco relacional. Toda a lógica de classificação opera no client-side.

## 3. Modelo de Dados (Component Level)
O banco de dados (Firestore) será normalizado ao máximo para reduzir leituras.
- **Coleção `users`:**
  - `uid` (string)
  - `email` (string)
  - `displayName` (string)
- **Coleção `matches`:**
  - `id` (string)
  - `category` (string: "Feminino" | "Masculino")
  - `group` (string: "A" | "B")
  - `team1` (string)
  - `team2` (string)
  - `score1` (number)
  - `score2` (number)
  - `isFinished` (boolean)
  - `updatedBy` (string - email do admin)

## 4. Regras de Negócio
- A tabela de classificação não existe como coleção estática; ela é um estado derivado (calculada dinamicamente via reducer/useMemo no React) a partir dos documentos da coleção `matches`.
- **Pontuação:** Vitória = 1 ponto. Derrota = 0 pontos.
- **Critérios de Desempate (Order of Operations):**
  1. Número de vitórias (descendente).
  2. Saldo de pontos nos sets (descendente).
  3. Confronto direto (se aplicável).

## 5. Fluxos Principais
1. **Autenticação:** Usuário acessa a rota `/`. Se não autenticado via Google, exibe apenas botão de Login.
2. **Categoria:** Admin alterna entre Feminino e Masculino; jogos e classificação exibem somente a categoria ativa.
3. **Atualização de Jogo:** Admin insere o placar no card do jogo e clica em "Salvar". O Firestore é atualizado com `isFinished: true` e `score`.
4. **Reatividade:** O listener `onSnapshot` do Firestore detecta a mudança e aciona o recalculo imediato da tabela de classificação na UI.