<template>
  <div id="app">
    <tab-content-area
      :tabs="characters"
      :tab-nav-id="uid"
      style-direction="right"
      :style-offset="true"
    >
      <template #default="{ tabs, selectedTab, doSelectTab, isSelectedTab, visibleTabs, overflowTabs }">
        <div class="content">
          <div
            class="tabs"
            :id="uid"
          >
            <button
              class="tab"
              @click="doSelectTab(tab)"
              v-for="(tab, tabIndex) in visibleTabs"
              :class="{ 'active' : isSelectedTab(tab) }"
              :key="`tab-${tabIndex}`"
            >
              {{ tab.title }}
              <button @click.stop="removeTab(tabIndex)">
                remove
              </button>
            </button>
          </div>
          <div class="content">
            <strong>visible</strong>
            <br>
            {{ visibleTabs }}
            <br>
            <br>
            <br>
            <strong>overflow</strong>
            <br>
            {{ overflowTabs }}
            <br>
            <br>
            <br>
            <strong>content</strong>
            <br>
            {{ selectedTab.content }}
          </div>
        </div>
      </template>
    </tab-content-area>
  </div>
</template>

<script>
import { TabContentArea } from './tabbed-content';

export default {
  name: 'App',
  components: {
    TabContentArea,
  },
  data() {
    return {
      uid: '128391239',
      characters: [
        { title: 'spider', content: 'Spider-Man' },
        { title: 'bat', content: 'Batman' },
        { title: 'cat', content: 'Catwoman' },
        { title: 'penguin', content: 'The Penguin' },
        { title: 'joker', content: 'The Joker' },
        { title: 'riddler', content: 'The Riddler' },
        { title: 'poison ivy', content: 'Poison Ivy' },
        { title: 'harley quinn', content: 'Harley Quinn' },
      ],
    };
  },
  methods: {
    removeTab(index) {
      this.characters.splice(index, 1);
      // const items = this.characters;
      // console.info(this.characters);
      // console.info(items);
      // items = items.splice(index, 1);
      // console.info(items);

      // let items = this.characters;
      // items = items.splice(index, 1);
      // console.info(index);
      // console.info(items);

      // this.characters = [
      //   ...items.splice(index, 1),
      // ];
    },
  },
};
</script>

<style>
/* visual debugging - no dashed lines should be visible with renderless components only */
#app * {
  border: #000 dashed 1px;
  padding: 0.5rem;
  margin: 0.5rem;
  position: relative;
}
.active {
  background: hotpink;
  color: white;
}
.tabs {
  display: flex;
  flex-direction: row;
}
button {
  flex: 0;
}
</style>
