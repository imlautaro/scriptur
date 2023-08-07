alter table "public"."verses" enable row level security;

create policy "Anyone can fetch verses"
on "public"."verses"
as permissive
for select
to public
using (true);