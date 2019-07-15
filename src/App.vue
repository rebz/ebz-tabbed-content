<template>
  <div id="app">
    <tab-content-area
      :tabs="characters"
      overflow-id="128391239"
    >
      <template #default="{ tabs, selectedTab, doSelectTab, isSelectedTab }">
        <div class="content">
          <div
            class="tabs"
            id="128391239"
          >
            <button
              class="tab"
              @click="doSelectTab(tab)"
              v-for="(tab, index) in tabs"
              :class="{ 'active' : isSelectedTab(tab) }"
              :key="`tab-${index}`"
            >
              {{ tab.title }}
            </button>
          </div>
          <div class="content">
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
      characters: [
        { title: 'bat', content: 'Batman' },
        { title: 'spider', content: 'Spider-Man' },
        { title: 'cat', content: 'Catwoman' },
        { title: 'penguin', content: 'The Penguin' },
      ],
    };
  },
  methods: {
    removeTab(index) {
      console.info(index);
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
/* #app *:after {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  content: ''
} */
</style>
