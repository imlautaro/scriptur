alter table "public"."bookmarks" enable row level security;

create policy "Only authenticated users can create bookmarks"
on "public"."bookmarks"
as permissive
for insert
to authenticated
with check (true);

create policy "Users have full control of their own bookmarks"
on "public"."bookmarks"
as permissive 
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);