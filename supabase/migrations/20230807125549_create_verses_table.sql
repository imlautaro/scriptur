create table
  public.verses (
    book bigint not null,
    chapter bigint not null,
    verse bigint not null,
    version_id bigint not null,
    content text not null,
    constraint verses_pkey primary key (book, chapter, verse, version_id),
    constraint verses_version_id_fkey foreign key (version_id) references versions (id) on delete cascade
  ) tablespace pg_default;