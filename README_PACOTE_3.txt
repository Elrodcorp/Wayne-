Pacote 3 — Supabase preparado

Este pacote adiciona:
- src/lib/supabase.ts
- src/services/courses.ts
- src/services/search.ts reescrito para usar Supabase quando configurado
- src/hooks/useCourses.ts
- componentes de resultado e filtros
- src/pages/Home.tsx reescrito
- supabase/courses.sql
- .env.example

Para usar sem Supabase:
O app continua funcionando com base local.

Para usar com Supabase:
1. Crie um projeto no Supabase.
2. Abra SQL Editor.
3. Cole e execute supabase/courses.sql.
4. Copie .env.example para .env.
5. Preencha:
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
6. Rode:
   npm install
   npm run dev
