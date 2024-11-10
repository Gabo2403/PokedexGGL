export interface MoveResponse {
  accuracy:             number;
  contest_combos:       null;
  contest_effect:       ContestEffect;
  contest_type:         ContestType;
  damage_class:         ContestType;
  effect_chance:        null;
  effect_changes:       EffectChange[];
  effect_entries:       MoveResponseEffectEntry[];
  flavor_text_entries:  FlavorTextEntry[];
  generation:           ContestType;
  id:                   number;
  learned_by_pokemon:   ContestType[];
  machines:             any[];
  meta:                 Meta;
  name:                 string;
  names:                Name[];
  past_values:          PastValue[];
  power:                number;
  pp:                   number;
  priority:             number;
  stat_changes:         any[];
  super_contest_effect: ContestEffect;
  target:               ContestType;
  type:                 ContestType;
}

export interface ContestEffect {
  url: string;
}

export interface ContestType {
  name: string;
  url:  string;
}

export interface EffectChange {
  effect_entries: EffectChangeEffectEntry[];
  version_group:  ContestType;
}

export interface EffectChangeEffectEntry {
  effect:   string;
  language: ContestType;
}

export interface MoveResponseEffectEntry {
  effect:       string;
  language:     ContestType;
  short_effect: string;
}

export interface FlavorTextEntry {
  flavor_text:   string;
  language:      ContestType;
  version_group: ContestType;
}

export interface Meta {
  ailment:        ContestType;
  ailment_chance: number;
  category:       ContestType;
  crit_rate:      number;
  drain:          number;
  flinch_chance:  number;
  healing:        number;
  max_hits:       null;
  max_turns:      null;
  min_hits:       null;
  min_turns:      null;
  stat_chance:    number;
}

export interface Name {
  language: ContestType;
  name:     string;
}

export interface PastValue {
  accuracy:       null;
  effect_chance:  null;
  effect_entries: any[];
  power:          null;
  pp:             null;
  type:           ContestType;
  version_group:  ContestType;
}
