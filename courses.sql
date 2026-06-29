create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  provider text not null,
  area text not null,
  level text not null,
  duration text not null,
  free boolean not null default true,
  certificate boolean not null default false,
  language text not null default 'Português',
  description text not null,
  url text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "courses_select_public"
on public.courses
for select
to anon, authenticated
using (true);

insert into public.courses
(title, provider, area, level, duration, free, certificate, language, description, url, tags)
values
('Introdução à Análise de Dados — Power BI','Fundação Bradesco','Power BI e Dados','Iniciante','5h',true,true,'Português','Curso introdutório para conhecer análise de dados e visualização com Power BI.','https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi',array['power bi','dados','dashboard','bi','excel']),
('Power BI para Aprimoramento da Gestão','Escola Virtual GOV / ENAP','Power BI e Dados','Intermediário','25h',true,true,'Português','Curso voltado à aplicação do Power BI em gestão, indicadores e tomada de decisão.','https://www.escolavirtual.gov.br/curso/840',array['power bi','gestão','dashboard','indicadores','dados']),
('Power BI Learning Paths','Microsoft Learn','Power BI e Dados','Todos','Variável',true,false,'Português/Inglês','Trilhas oficiais da Microsoft para aprender Power BI, relatórios e modelagem.','https://learn.microsoft.com/pt-br/training/powerplatform/power-bi',array['power bi','microsoft','bi','data visualization']),
('Fundamentos de IA no Microsoft Learn','Microsoft Learn','Inteligência Artificial','Iniciante','Variável',true,false,'Português/Inglês','Conteúdos oficiais para iniciar em inteligência artificial, cloud e serviços de IA.','https://learn.microsoft.com/pt-br/training/',array['ia','inteligência artificial','azure','machine learning','microsoft']),
('Google Skillshop — IA e Marketing Digital','Google Skillshop','Inteligência Artificial','Iniciante','Variável',true,true,'Português/Inglês','Cursos gratuitos do Google para competências digitais, IA aplicada e produtividade.','https://skillshop.withgoogle.com/',array['ia','google','marketing digital','produtividade','automação']),
('Data Science Courses','Class Central','Ciência de Dados','Todos','Variável',true,false,'Inglês/Português','Busca global por cursos de ciência de dados em universidades e plataformas abertas.','https://www.classcentral.com/search?q=data%20science',array['data science','dados','python','sql','machine learning']),
('Proteção de Dados Pessoais','Escola Virtual GOV / ENAP','Direito Digital','Iniciante','Variável',true,true,'Português','Curso sobre proteção de dados pessoais, LGPD e boas práticas no setor público.','https://www.escolavirtual.gov.br/',array['direito','lgpd','proteção de dados','compliance','jurídico']),
('Cursos gratuitos em Direito','FGV','Direito Digital','Variável','Variável',true,true,'Português','Catálogo de cursos gratuitos da FGV com temas jurídicos, gestão e sociedade.','https://educacao-executiva.fgv.br/cursos/gratuitos',array['direito','fgv','compliance','contratos','administração pública']),
('Gestão Financeira','Sebrae','Contabilidade e Controladoria','Iniciante','10h',true,true,'Português','Curso para organizar finanças, fluxo de caixa, gestão e controles financeiros.','https://loja.sebrae.com.br/cursos/cursos-online',array['contabilidade','financeiro','fluxo de caixa','gestão','controladoria']),
('Logística e Compras Públicas','Escola Virtual GOV / ENAP','Logística e Operações','Intermediário','Variável',true,true,'Português','Formação em logística, compras públicas, processos e eficiência operacional.','https://www.escolavirtual.gov.br/?id_tematica=39',array['logística','compras','suprimentos','processos','operação']),
('Autodesk Learn — AutoCAD e Revit','Autodesk Learn','Arquitetura e BIM','Todos','Variável',true,false,'Inglês/Português','Conteúdos oficiais para ferramentas como AutoCAD, Revit e BIM.','https://www.autodesk.com/learn',array['arquitetura','autocad','revit','bim','projeto'])
on conflict do nothing;
