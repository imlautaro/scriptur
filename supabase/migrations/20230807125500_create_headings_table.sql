create table
  public.headings (
    book bigint not null,
    chapter bigint not null,
    verse bigint not null,
    en text null,
    es text null,
    constraint headings_pkey primary key (book, chapter, verse)
  ) tablespace pg_default;