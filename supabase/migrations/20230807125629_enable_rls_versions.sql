alter table "public"."versions" enable row level security;

create policy "Anyone can fetch versions"
on "public"."versions"
as permissive
for select
to public
using (true);