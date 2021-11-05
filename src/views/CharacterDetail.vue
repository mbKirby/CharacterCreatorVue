<template>
  <div id="characterDetail" class="container">
    <!-- <button @click="roll_dice(hitDie[`${clas}`])">test</button>
    <p>roll:{{ roll }}</p>
    <p>{{ hitDie.Barbarian }} {{ clas }} {{ hitDie[`${clas}`] }}</p> -->
    <div class="text-center">
      <p class="fs-2">
        {{ character.name }} Level:{{ character.characterLevel }}
      </p>
      <p class="fs-4">
        Race: {{ character.raceSelection }}
        <span v-if="character.subRaceSelection">
          SubRace: {{ character.subRaceSelection }}
        </span>
      </p>
      <p class="fs-4">
        Class: {{ character.classSelection }}
        <span v-if="character.subClassSelection">
          SubClass: {{ character.subClassSelection }}
        </span>
      </p>
      <p class="fs-4">Alignment: {{ character.alignmentSelection }}</p>
    </div>

    <div class="text-center border row">
      <div class="row justify-content-evenly">
        <span class="col-3">
          <p class="fs-5">AC: {{ character.armorClass }}</p>
        </span>
        <span class="col-3">
          <p class="fs-5">Initiative: {{ savingThrows(character.dex) }}</p>
        </span>
        <span class="col-3">
          <p class="fs-5">Speed: {{ character.speed }}</p>
        </span>
      </div>
      <div>
        <p class="fs-5">
          Max Hit Points:
          {{ character.hitPoints }}
        </p>
        <p class="fs-5">
          Current Hit Points:
          <input
            style="width: 3em"
            type="number"
            name="currentHP"
            id="currentHP"
            :value="character.currentHitPoints"
          />
        </p>
      </div>
    </div>

    <div class="row justify-content-center border">
      <span class="col-4 text-center">
        <p class="fs-5">Hit Die</p>
        <p class="fs-5">{{ hitDie[`${clas}`] }}</p>
      </span>
      <span class="col-4 text-center">
        <p class="fs-5">Temporary Hit Points</p>
        <input type="number" style="width: 3em" />
      </span>
      <span class="col-4 text-center">
        <div>
          <p class="fs-5">Death Saves</p>
          <div>
            <label class="form-check-label" style="float: left" for="save1"
              >Saves</label
            >
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="save1" />
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="save2" />
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="save3" />
            </div>
          </div>
          <div>
            <label class="form-check-label" style="float: left" for="save1"
              >Fails</label
            >
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="fail1" />
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="fail2" />
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="fail3" />
            </div>
          </div>
        </div>
      </span>
    </div>

    <div class="row text-center">
      <div class="col border">
        <p>CHA: {{ character.cha }}</p>
        <p>Saving Throw: {{ savingThrows(character.cha) }}</p>
        <div :key="skill" v-for="skill in proficiencies.cha">
          <p
            :key="skillDesc"
            v-for="[skillDesc, skillValue] of Object.entries(skill)"
          >
            {{ skillDesc }}: {{ skillValue + savingThrows(character.cha) }}
          </p>
        </div>
      </div>

      <div class="col border">
        <p>CON: {{ character.con }}</p>
        <p>Saving Throw: {{ savingThrows(character.con) }}</p>
      </div>

      <div class="col border">
        <p>DEX: {{ character.dex }}</p>
        <p>Saving Throw: {{ savingThrows(character.dex) }}</p>
        <div :key="skill" v-for="skill in proficiencies.dex">
          <p
            :key="skillDesc"
            v-for="[skillDesc, skillValue] of Object.entries(skill)"
          >
            {{ skillDesc }}: {{ skillValue + savingThrows(character.dex) }}
          </p>
        </div>
      </div>
    </div>

    <div class="row text-center">
      <div class="col border">
        <p>INT: {{ character.int }}</p>
        <p>Saving Throw: {{ savingThrows(character.int) }}</p>
        <div :key="skill" v-for="skill in proficiencies.int">
          <p
            :key="skillDesc"
            v-for="[skillDesc, skillValue] of Object.entries(skill)"
          >
            {{ skillDesc }}: {{ skillValue + savingThrows(character.int) }}
          </p>
        </div>
      </div>

      <div class="col border">
        <p>STR: {{ character.str }}</p>
        <p>Saving Throw: {{ savingThrows(character.str) }}</p>
        <div :key="skill" v-for="skill in proficiencies.str">
          <p
            :key="skillDesc"
            v-for="[skillDesc, skillValue] of Object.entries(skill)"
          >
            {{ skillDesc }}: {{ skillValue + savingThrows(character.str) }}
          </p>
        </div>
      </div>

      <div class="col border">
        <p>WIS: {{ character.wis }}</p>
        <p>Saving Throw: {{ savingThrows(character.wis) }}</p>
        <div :key="skill" v-for="skill in proficiencies.wis">
          <p
            :key="skillDesc"
            v-for="[skillDesc, skillValue] of Object.entries(skill)"
          >
            {{ skillDesc }}: {{ skillValue + savingThrows(character.wis) }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-2 row justify-content-center text-center">
      <select class="col-2" v-model.number="diceType" id="subRaceSelection">
        <option selected>20</option>
        <option>12</option>
        <option>10</option>
        <option>8</option>
        <option>6</option>
        <option>4</option>
      </select>
      <button @click="roll_dice(diceType)" class="col-1 btn btn-primary">
        Roll
      </button>
      <p class="pt-2" v-if="roll != null">You rolled a {{ roll }}</p>
    </div>

    <div class="row mb-4 justify-content-center text-center">
      <div class="col-6">
        <div v-if="character.cantripsSelection">
          <p id="spells" class="fs-5 mb-1">Cantrips</p>
          <div :key="cantrip" v-for="cantrip in cantrips">
            {{ cantrip }}
          </div>
        </div>
        <div class="pt-2" v-if="character.spellSelection">
          <p id="spells" class="fs-5 mb-1">Spells</p>
          <div :key="spell" v-for="spell in spells">
            {{ spell }}
          </div>
        </div>
      </div>
      <div id="spells" class="col-6">
        <p class="fs-5 mb-1">Equipment</p>
        <div :key="item" v-for="item in equipment">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>

    <div class="mb-5 text-center">
      <div class="row justify-content-center">
        <div class="col-4">
          <input class="form-control" type="text" v-model="spell" />
        </div>
        <button @click="findSpell()" class="col-2 btn btn-primary">
          Find Spell
        </button>
      </div>
      <div v-if="spellDesc" class="text-center">
        <h3>Spell Description</h3>
        <p>
          {{ spellDesc.desc[0] }}
        </p>
        <div v-if="spellDesc.higher_level">
          <h3>Spell usage at higher level</h3>
          <p>
            {{ spellDesc.higher_level[0] }}
          </p>
        </div>
        <h3>Range</h3>
        <p>
          {{ spellDesc.range }}
        </p>
      </div>
    </div>

    <div class="row justify-content-evenly mt-5">
      <button disabled class="btn-primary btn col-2" @click="saveCharacter">
        Save
      </button>
      <button class="btn-primary btn col-2" @click="deleteCharacter">
        Delete
      </button>
    </div>
    <!-- <button @click="test">test</button> -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["characterName"],
  data() {
    return {
      clas: "",
      currentHitPoints: [],
      character: {},
      proficiencies: {
        cha: [
          { Deception: 0 },
          { Intimidation: 0 },
          { Performance: 0 },
          { Persuasion: 0 },
        ],
        con: [],
        dex: [{ Acrobatics: 0 }, { "Sleight of Hand": 0 }, { Stealth: 0 }],
        int: [
          { Arcana: 0 },
          { History: 0 },
          { Investigation: 0 },
          { Nature: 0 },
          { Religion: 0 },
        ],
        str: [{ Athletics: 0 }],
        wis: [
          { "Animal Handling": 0 },
          { Insight: 0 },
          { Medicine: 0 },
          { Perception: 0 },
          { Survival: 0 },
        ],
      },
      roll: null,
      diceType: 20,
      hitDie: {
        Barbarian: 12,
        Bard: 8,
        Cleric: 8,
        Druid: 8,
        Fighter: 10,
        Monk: 8,
        Paladin: 10,
        Ranger: 10,
        Rogue: 8,
        Sorcerer: 6,
        Warlock: 8,
        Wizard: 6,
      },
      spell: null,
      spellInfo: null,
      spellUrl: null,
      spellDesc: null,
      spells: [],
      cantrips: [],
      equipment: [],
    };
  },
  methods: {
    test() {
      console.log(this.cantrips);
    },
    getCharacter() {
      return axios({
        method: "get",
        url:
          "https://character-creator-drf.herokuapp.com/characters/" +
          `${this.characterName}`,
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
      })
        .then((response) => {
          this.character = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    savingThrows(ability) {
      let save = 0;
      switch (ability) {
        case 1:
          save = -5;
          break;
        case 2:
        case 3:
          save = -4;
          break;
        case 4:
        case 5:
          save = -3;
          break;
        case 6:
        case 7:
          save = -2;
          break;
        case 8:
        case 9:
          save = -1;
          break;
        case 10:
        case 11:
          save = 0;
          break;
        case 12:
        case 13:
          save = 1;
          break;
        case 14:
        case 15:
          save = 2;
          break;
        case 16:
        case 17:
          save = 3;
          break;
        case 18:
        case 19:
          save = 4;
          break;
        case 20:
        case 21:
          save = 5;
          break;
        case 22:
        case 23:
          save = 6;
          break;
        case 24:
        case 25:
          save = 7;
          break;
        case 26:
        case 27:
          save = 8;
          break;
        case 28:
        case 29:
          save = 9;
          break;
        case 30:
          save = 10;
      }
      return save;
    },
    toList(string) {
      let newList = string.split(",");
      return newList;
    },
    addProficiencies() {
      this.clas = this.character.classSelection;
      let characterProficiencies = this.toList(
        this.character.chosenProficiencies
      );
      if (
        Object.keys(this.proficiencies.str[0])[0] === characterProficiencies[1]
      ) {
      }
      for (let i = 0; i < characterProficiencies.length; i++) {
        switch (characterProficiencies[i]) {
          case Object.keys(this.proficiencies.cha[0])[0]:
            this.proficiencies.cha[0].Deception += 3;
            break;
          case Object.keys(this.proficiencies.cha[1])[0]:
            this.proficiencies.cha[1].Intimidation += 3;
            break;
          case Object.keys(this.proficiencies.cha[2])[0]:
            this.proficiencies.cha[2].Performance += 3;
            break;
          case Object.keys(this.proficiencies.cha[3])[0]:
            this.proficiencies.cha[3].Persuasion += 3;
            break;
          // End of cha
          case Object.keys(this.proficiencies.dex[0])[0]:
            this.proficiencies.dex[0].Acrobatics += 3;
            break;
          case Object.keys(this.proficiencies.dex[1])[0]:
            this.proficiencies.dex[1]["Sleight of Hand"] += 3;
            break;
          case Object.keys(this.proficiencies.dex[2])[0]:
            this.proficiencies.dex[2].Stealth += 3;
            break;
          // End of dex
          case Object.keys(this.proficiencies.int[0])[0]:
            this.proficiencies.int[0].Arcana += 3;
            break;
          case Object.keys(this.proficiencies.int[1])[0]:
            this.proficiencies.int[1].History += 3;
            break;
          case Object.keys(this.proficiencies.int[2])[0]:
            this.proficiencies.int[2].Investigation += 3;
            break;
          case Object.keys(this.proficiencies.int[3])[0]:
            this.proficiencies.int[3].Nature += 3;
            break;
          case Object.keys(this.proficiencies.int[4])[0]:
            this.proficiencies.int[4].Religion += 3;
            break;
          //end of int
          case Object.keys(this.proficiencies.str[0])[0]:
            this.proficiencies.str[0].Athletics += 3;
            console.log("strength chack");
            break;
          //end of str
          case Object.keys(this.proficiencies.wis[0])[0]:
            this.proficiencies.wis[0]["Animal Handling"] += 3;
            break;
          case Object.keys(this.proficiencies.wis[1])[0]:
            this.proficiencies.wis[1].Insight += 3;
            break;
          case Object.keys(this.proficiencies.wis[2])[0]:
            this.proficiencies.wis[2].Medicine += 3;
            break;
          case Object.keys(this.proficiencies.wis[3])[0]:
            this.proficiencies.wis[3].Perception += 3;
            break;
          case Object.keys(this.proficiencies.wis[4])[0]:
            this.proficiencies.wis[4].Survival += 3;
            break;
        }
      }
    },
    changeSpells() {
      this.spells = this.toList(this.character.spellSelection);
      this.cantrips = this.toList(this.character.cantripsSelection);
    },
    changeEquipment() {
      this.equipment = this.toList(this.character.equipment);
    },
    getCharacterSkills() {
      this.addProficiencies();
      this.changeSpells();
      this.changeEquipment();
    },

    findSpell() {
      axios({
        method: "get",
        url: "https://www.dnd5eapi.co/api/spells",
        params: {
          name: this.spell,
        },
      }).then((response) => {
        this.spellInfo = response.data.results;
        this.spellUrl = this.spellInfo[0].url;
        axios({
          method: "get",
          url: "https://www.dnd5eapi.co" + this.spellUrl,
        }).then((response) => {
          this.spellDesc = response.data;
        });
      });
    },
    deleteCharacter() {
      axios({
        method: "delete",
        url:
          "https://character-creator-drf.herokuapp.com/characters/" +
          `${this.characterName}`,
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
      }).then(() => {
        this.$router.push({ name: "character-sheet" });
      });
    },
    saveCharacter() {
      axios({
        method: "patch",
        url:
          "https://character-creator-drf.herokuapp.com/characters/" +
          `${this.characterName}`,
        headers: { Authorization: `Bearer ${this.$store.state.accessToken}` },
        data: {
          characterLevel: character.characterLevel,
          age: character.age,
          armorClass: character.armorClass,
          hitPoints: character.hitPoints,
          currentHitPoints: this.currentHitPoints,
          Speed: character.Speed,
          passivePerception: character.passivePerception,
          darkVision: character.darkVision,
          alignmentSelection: character.alignmentSelection,
          cha: character.characterAbilityScores.cha,
          con: character.characterAbilityScores.con,
          dex: character.characterAbilityScores.dex,
          int: character.characterAbilityScores.int,
          str: character.characterAbilityScores.str,
          wis: character.characterAbilityScores.wis,
          languageToolProficienciesSelection:
            character.languageToolProficienciesSelection,
          cantripsSelection: character.cantripsSelection,
          equipment: character.equipmentSelection,
        },
      });
    },
    roll_dice(type_of_dice) {
      let roll = 0;
      let min = 1;
      roll = Math.floor(Math.random() * type_of_dice + min);
      this.roll = roll;
    },
  },
  mounted() {},
  created() {
    this.getCharacter().then(() => this.getCharacterSkills());
  },
};
</script>