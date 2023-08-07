alter table "public"."headings" enable row level security;

create policy "Anyone can fetch headings"
on "public"."headings"
as permissive
for select
to public
using (true);