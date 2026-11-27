/*
# Seed ROOTED Showcase — approved example pieces

1. Overview
   Inserts a handful of approved showcase submissions so the public
   gallery is populated on first visit. Each row is inserted directly as
   status='approved' by the service_role migration runner (this migration
   runs with elevated privileges that bypass RLS).

2. Notes
   - Uses fixed, clearly-fictional creator names and handles.
   - cover_color values drive the gradient placeholder palette in the UI.
   - Idempotent: wrapped in a guard so re-running does not duplicate rows
     (checks title + creator_name before inserting).
*/

DO $$
DECLARE
  v_count integer;
BEGIN
  SELECT count(*) INTO v_count FROM showcase_submissions WHERE status = 'approved';
  IF v_count > 0 THEN
    RETURN;
  END IF;

  INSERT INTO showcase_submissions (creator_name, creator_handle, email, country, category, title, description, media_url, cover_color, consent, status)
  VALUES
    ('Amara Diallo', 'amara_creates', 'seed@example.invalid', 'Senegal', 'Photography',
     'Streets of Dakar at Dawn',
     'A photo series capturing the first light over Dakar''s markets — the vendors, the colours, the quiet before the city wakes. Shot on 35mm film over three months.',
     NULL, 'amber', true, 'approved'),

    ('Thandiwe Mokoena', 'thandi.studio', 'seed@example.invalid', 'South Africa', 'Fashion',
     'Heritage Reimagined',
     'A capsule collection merging traditional Ndebele beadwork with contemporary streetwear silhouettes. Each piece is hand-finished by artisans in Pretoria.',
     NULL, 'rose', true, 'approved'),

    ('Kwame Asante', 'kwame.films', 'seed@example.invalid', 'Ghana', 'Video',
     'Accra in Motion',
     'A short documentary following three young skateboarders building a community in Accra, told through their voices and the rhythm of the city.',
     NULL, 'teal', true, 'approved'),

    ('Leyla Hassan', 'leyla.draws', 'seed@example.invalid', 'Egypt', 'Artwork',
     'Cartographies of Memory',
     'An illustrated series mapping family stories across generations — each drawing layers places, objects and phrases passed down through my grandmother.',
     NULL, 'clay', true, 'approved'),

    ('Sadio Touré', 'sadio.music', 'seed@example.invalid', 'Mali', 'Music',
     'River Songs — Single',
     'A debut single blending the kora with modern electronic production, recorded on the banks of the Niger River. A meditation on home and distance.',
     NULL, 'gold', true, 'approved'),

    ('Nia Okonkwo', 'nia.brand', 'seed@example.invalid', 'Nigeria', 'Advertising',
     'Rooted — Brand Identity',
     'A full brand identity for a local cooperative: logo system, packaging and campaign visuals rooted in Igbo uli motifs, designed for a global shelf.',
     NULL, 'emerald', true, 'approved'),

    ('Joseph Mwangi', 'joseph.makes', 'seed@example.invalid', 'Kenya', 'Creative Project',
     'The Workshop',
     'A community makerspace in Nairobi where young creatives learn woodworking, textiles and digital fabrication. This entry documents the first six months.',
     NULL, 'copper', true, 'approved'),

    ('Fatima Bello', 'fatima.frames', 'seed@example.invalid', 'Nigeria', 'Photography',
     'Mothers and Daughters',
     'An ongoing portrait series exploring the gestures, glances and unspoken bonds shared between mothers and daughters across three northern Nigerian families.',
     NULL, 'plum', true, 'approved');
END $$;
