const DIALOGUES = {
  NPC000001: [
    {
      when: { questCompleted: 'QST000001' },
      pages: [
        'You have found your footing, {player}. San Isidro remembers those who learn its paths before asking the paths to serve them.',
        'The marketplace and courtyard can prepare your hands. The forest will ask whether your judgment is ready.',
      ],
    },
    {
      pages: [
        'Welcome to San Isidro, {player}. Walk the paths first; the land teaches before it tests.',
        'Speak with Lira and meet the people who keep this barangay breathing. A traveler survives by listening.',
      ],
      choices: [
        { id: 'datu_forest', label: 'Ask about the forest', response: 'The Balete Forest is neither enemy nor sanctuary. Enter carefully, and leave every mound undisturbed.', consequences: { flags: ['asked_datu_about_forest'] } },
        { id: 'datu_begin', label: 'Ask where to begin', response: 'Begin nearby. Learn the Balon, greet Lira, and carry a healing herb before following distant stories.', consequences: { flags: ['asked_datu_where_to_begin'] } },
      ],
    },
  ],
  NPC000002: [
    {
      when: { questCompleted: 'QST000001' },
      pages: [
        'You listened well. Keep doing so when the voices beyond the barangay become harder to understand.',
      ],
    },
    {
      pages: [
        'Try speaking with villagers and reading the shape of the road. Not every lesson arrives as a battle.',
        'Nilalang have habits, boundaries, and reasons. Knowing those may protect you better than a sharpened blade.',
      ],
    },
  ],
  NPC000301: [
    {
      pages: [
        'The shelves are modest, but a traveler should never enter the forest empty-handed.',
        'Healing herbs mend ordinary wounds. Sacred river water is rarer; save it for a moment that truly needs it.',
      ],
    },
  ],
  NPC000481: [
    {
      when: { companion: true },
      pages: [
        'A steady hand now travels with a steady heart. I can shape gear for you and your companion, but neither should carry what they have not learned to use.',
      ],
    },
    {
      pages: [
        'A blade is only as steady as the hand that carries it.',
        'Bring me sound materials and I can make field gear. Bring me haste, and I will send you away with it.',
      ],
    },
  ],
  NPC000004: [
    {
      pages: [
        'Many prayers share this courtyard. ALAMAT asks us to listen before naming what is true.',
        'People give different names to wonder, grief, and the unseen. Our barangay has room for those differences.',
      ],
      choices: [
        { id: 'mayumi_courtyard', label: 'Offer to tend the courtyard', response: 'Then begin with what is small. Three neglected corners need care before sunset.', consequences: { flags: ['choice_tend_courtyard'], startQuest: 'QST000025' } },
        { id: 'mayumi_nilalang', label: 'Ask about Nilalang', response: 'Treat them as neighbors with unfamiliar customs, not symbols waiting to be owned.', consequences: { flags: ['asked_mayumi_about_nilalang'] } },
      ],
    },
  ],
  NPC000582: [
    {
      when: { companion: true },
      pages: [
        'Aghoy chose to remain beside you. A bond is not a finished promise, {player}; it is a promise renewed by every choice.',
        'Watch your companion in battle. Strength grows differently when it is trusted rather than commanded.',
      ],
    },
    {
      when: { questCompleted: 'QST000005' },
      pages: [
        'The shrine has answered your actions, but no Nilalang owes you companionship.',
        'Return to the one whose trust you earned. Offer a path beside you, and accept the answer freely given.',
      ],
    },
    {
      pages: [
        'Nilalang are not prizes. If one walks beside you someday, earn that trust.',
        'Restore what has been disturbed. Help without demanding a reward. A true bond begins before either side names it.',
      ],
    },
  ],
  NPC000008: [
    {
      when: { questCompleted: 'QST000004' },
      pages: [
        'You crossed the old paths and returned with your respect intact. That matters more than boasting about what you defeated.',
      ],
    },
    {
      pages: [
        'The old tree is restless. Step lightly, and do not mock the mound paths.',
        'Ungo watches strength. Aghoy watches intent. Neither will care what the barangay calls you if your actions speak otherwise.',
      ],
      choices: [
        { id: 'kidlat_aghoy', label: 'Ask about Aghoy', response: 'Small footprints circle damaged roots. Help the forest, and the shy one may decide you are worth watching.', consequences: { flags: ['asked_kidlat_about_aghoy'], startQuest: 'QST000026' } },
        { id: 'kidlat_danger', label: 'Ask about the danger', response: 'Do not mistake silence for safety. Carry medicine, and know when leaving is wiser than winning.', consequences: { flags: ['asked_kidlat_about_danger'] } },
      ],
    },
  ],
  MON0040: [
    {
      when: { questCompleted: 'QST000027' },
      pages: [
        'The freshwater current carries less fear now. You listened to what guarded the reeds instead of naming it hostile.',
        'Remember the distinction, {player}: lake, river, forest, and sea each hold different lives. Respect begins by noticing where a being belongs.',
      ],
    },
    {
      when: { companion: true },
      pages: [
        'The echo has become a harmony. Guard it without smothering it, {player}.',
        'Every future bond will have its own language. What worked once must never become a cage disguised as tradition.',
      ],
    },
    {
      when: { questCompleted: 'QST000005' },
      pages: [
        'The nightmare has loosened its hold. You stood before fear without calling everything unfamiliar an enemy.',
        'A companion is not claimed here. One may now answer because trust has somewhere to stand.',
      ],
      choices: [
        { id: 'echo_next', label: 'Ask what comes next', response: 'Return with patience. The first bond should be an invitation, never a capture.', consequences: { flags: ['echo_guidance_bond'] } },
        { id: 'echo_shrine', label: 'Promise to preserve the threshold', response: 'Then carry its lesson beyond these roots. The lakeshore also strains beneath promises forgotten.', consequences: { flags: ['echo_guidance_lakeshore'], startQuest: 'QST000027' } },
      ],
    },
    {
      pages: [
        'The threshold is clouded by a presence that feeds on fear and exhaustion.',
        'Do not seek a companion as a reward. First prove that you can restore balance without possessing what you save.',
      ],
    },
  ],
  AMBIENT_CHAPEL_GARDEN: [{ pages: ['Several plants have been crowded by windblown debris. You clear the soil while leaving the nearby offerings undisturbed.'] }],
  AMBIENT_CHAPEL_LAMPS: [{ pages: ['These lamps serve every visitor to the courtyard. Fresh wicks bring a patient glow back to the shared space.'] }],
  AMBIENT_MARKET_PLAZA: [{ pages: ['San Isidro keeps trade close to ordinary barangay life. Growers, craftspeople, and travelers share the same central paths.'] }],
  AMBIENT_AGHOY_TRACKS: [{ pages: ['Small tracks bend around the mound rather than crossing it. Aghoy has been showing travelers the respectful route.'] }],
  AMBIENT_DAMAGED_ROOTS: [{ pages: ['You lift dead branches away from a living root. A soft rustle answers from somewhere beyond sight.'] }],
  AMBIENT_TANGLED_NETS: [{ pages: ['The abandoned net was not torn by hunger. Its hooks were pulled away from the spawning reeds, as if something tried to protect them.'] }],
  AMBIENT_REED_NURSERY: [{ pages: ['Several young reeds have been pressed flat. You brace the viable shoots with fallen stems and leave the healthy growth rooted in place.'] }],
  AMBIENT_CLEAR_WATER_PATCH: [{ pages: ['Loose cord lifts from the spawning grass. Tiny movements return beneath the clear water once the living stems are free.'] }],
  NPC000601: [
    {
      when: { questCompleted: 'QST000027' },
      pages: [
        'The inlet runs clearly again, {player}. Mambubuno was defending the current, not declaring war on the shore.',
        'We will change where the community sets its nets. Balance asks something from us too.',
      ],
    },
    {
      pages: [
        'I am Ka Amihan, one of the people entrusted with watching these shared waters.',
        'The current changed after abandoned cord reached the spawning reeds. Something beneath the lake has been pulling the danger away.',
      ],
      choices: [
        {
          id: 'amihan_listen_current',
          label: 'Ask how to help',
          response: 'Inspect the tangled nets before confronting anything. Evidence should guide your courage.',
          consequences: { flags: ['listened_to_lakeshore_steward'] },
        },
        {
          id: 'amihan_ask_guardian',
          label: 'Ask about the guardian',
          response: 'Mambubuno governs currents, not people. Approach as a neighbor crossing a boundary, not a hunter claiming a prize.',
          consequences: { flags: ['asked_about_mambubuno'] },
        },
      ],
    },
  ],
  NPC000602: [
    {
      when: { questCompleted: 'QST000028' },
      pages: [
        'The nursery is standing again. You left enough untouched that the shore can heal itself.',
        'That restraint is part of medicine too, {player}.',
      ],
    },
    {
      pages: [
        'Call me Aling Sela. I prepare remedies from what the reeds can spare, never from what the nursery still needs.',
        'The damaged waterline needs careful hands. Helping would teach you more than filling a basket.',
      ],
      choices: [
        {
          id: 'sela_accept_reed_work',
          label: 'Offer to restore the reeds',
          response: 'Support the crushed nursery and clear the loose cord from the spawning grass. Take nothing that is still growing.',
          consequences: { flags: ['accepted_reed_restoration'], startQuest: 'QST000028' },
        },
        {
          id: 'sela_ask_medicine',
          label: 'Ask about lake remedies',
          response: 'A remedy is a relationship with its source. If harvesting leaves the source weaker, it was poor medicine.',
          consequences: { flags: ['learned_reed_harvest_rule'] },
        },
      ],
    },
  ],
  NPC000603: [
    {
      when: { questCompleted: 'QST000027' },
      pages: [
        'The channel is calmer, but the route beyond it is not ready for travelers yet.',
        'When the next shore has people, paths, and a safe return, my bangka will have somewhere honest to take you.',
      ],
    },
    {
      pages: [
        'Mang Isko, bangkero. I know these channels well enough to admit when they should not be crossed.',
        'Help the shore first. A boat is not progress if it carries an unresolved problem somewhere else.',
      ],
      choices: [
        {
          id: 'isko_ask_routes',
          label: 'Ask about future routes',
          response: 'One channel bends toward river settlements; another eventually meets salt water. They will open when those places are ready to receive you.',
          consequences: { flags: ['asked_bangkero_about_routes'] },
        },
        {
          id: 'isko_ask_bangka',
          label: 'Ask about the bangka',
          response: 'Shallow draft, balanced outriggers, and repairs made before pride. The lake rewards preparation.',
          consequences: { flags: ['learned_bangka_safety'] },
        },
      ],
    },
  ],
}

export function dialogueFor(object, save) {
  const variants = DIALOGUES[object.id] ?? []
  const variant = variants.find((entry) => matches(entry.when, save))
  const pages = (variant?.pages ?? [object.dialogue ?? '...']).map((text) => interpolate(text, save))
  const choices = (variant?.choices ?? []).map((choice) => ({
    ...choice,
    response: interpolate(choice.response, save),
  }))

  return {
    dialogue_id: `${object.id}:${variant ? variants.indexOf(variant) : 'fallback'}`,
    speaker: object.label,
    entity_id: object.id,
    pages,
    choices,
    context: object.activity ? `${capitalize(object.worldPeriod)}: ${object.activity}` : null,
  }
}

export function applyDialogueChoice(save, entityId, choice) {
  if (!choice?.id || save.world.dialogue_choices?.[choice.id]) {
    return { changed: false, message: choice?.response ?? '' }
  }
  save.world.dialogue_choices ??= {}
  save.world.dialogue_choices[choice.id] = {
    entity_id: entityId,
    selected_at: new Date().toISOString(),
  }
  for (const flag of choice.consequences?.flags ?? []) {
    if (!save.world.story_flags.includes(flag)) save.world.story_flags.push(flag)
  }
  return {
    changed: true,
    startQuest: choice.consequences?.startQuest ?? null,
    message: choice.response,
  }
}

function matches(condition, save) {
  if (!condition) return true
  if (condition.questCompleted && !save.quests?.completed?.[condition.questCompleted]) return false
  if (condition.questActive && !save.quests?.active?.[condition.questActive]) return false
  if (condition.flag && !save.world?.story_flags?.includes(condition.flag)) return false
  if (condition.companion === true && !save.companions?.active_companion_id) return false
  if (condition.companion === false && save.companions?.active_companion_id) return false
  return true
}

function interpolate(text, save) {
  return text.replaceAll('{player}', save.player?.name || 'Manlalakbay')
}

function capitalize(value) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : ''
}
