<script>
export default {
  // todo: prop: `overflow-control: false`... if true will use JS to determine tabs that overflow
  // todo: option: set selected start, by index or object
  // todo: user define tab content area

  // DONE
  // todo: user define tab head area
  // todo: options: user defines if padding (enabled by default), margin, border is taken into effect
  // todo: options: user defines direction of padding/margin/border
  name: 'TabContentArea',

  props: {

    // DOC: ...
    tabs: {
      required: false,
      default: () => [],
      type: Array,
    },

    // DOC: required if user wants tab navigation overflow
    tabNavId: {
      required: false,
      default: false,
      type: [String, Boolean],
    },

    // DOC: determines if user wants overflow calculation to take into account margin, border, and padding
    styleOffset: {
      required: false,
      default: false,
      type: Boolean,
    },

    // DOC: determines what direction to calculate overflow offset from element styles
    styleDirection: {
      required: false,
      default: 'right',
      type: String,
      // TODO: provide error message
      validator: value => ['right', 'left', 'top', 'bottom'].includes(value),
    },
  },
  mounted() {
    if (this.tabNavId) this.overflowEl = document.getElementById(this.tabNavId);
    if (this.overflowEl) window.addEventListener('resize', this.hasWindowResized);
  },
  beforeDestroy() {
    if (this.overflowEl) window.removeEventListener('resize', this.hasWindowResized);
  },
  data: () => ({

    // DOC: exposed
    selectedTab: false,

    // DOC: exposed
    lastVisibleTabIndex: 0,

    // DOC: #private
    overflowEl: false,
  }),
  watch: {
    tabs: {
      immediate: true,
      handler() {
        this.doTabsCheck();
      },
    },
  },
  computed: {

    // DOC: exposed, boolean return
    hasOverflowEnabled() {
      return !!this.tabNavId && !!this.overflowEl;
    },

    // DOC: exposed, list of tabs that fit within tab navigation
    visibleTabs() {
      const { tabs, hasOverflowEnabled } = this;
      if (!hasOverflowEnabled) return false;
      return tabs.reduce((visibleTabs, tab, tabIndex) => {
        if (tabIndex <= this.lastVisibleTabIndex) visibleTabs.push(tab);
        return visibleTabs;
      }, []);
    },

    // overflowTabs() {
    //   const { tabs, hasOverflowEnabled } = this;
    //   if (!hasOverflowEnabled) return false;
    //   return tabs.reduce((visibleTabs, tab, tabIndex) => {
    //     if (tabIndex > this.lastVisibleTabIndex) visibleTabs.push(tab);
    //     return visibleTabs;
    //   }, []);
    // },

    // visibleTabs() {
    //   const { tabs, lastVisibleTabIndex, hasOverflowEnabled } = this;
    //   if (!hasOverflowEnabled) return false;
    //   const visibleTabs = tabs;
    //   return visibleTabs.splice(0, lastVisibleTabIndex);
    // },

    // DOC: exposed,  list of tabs that fall outside of the tab navigation
    overflowTabs() {
      const { tabs, hasOverflowEnabled, lastVisibleTabIndex } = this;
      if (!hasOverflowEnabled) return false;
      const visibleTabs = tabs;
      return visibleTabs.slice(lastVisibleTabIndex + 1, tabs.length);
    },

  },
  methods: {
    // DOC: #private
    doSanitizeStyles(string) {
      return parseInt(string.substring(0, string.length - 2)); // should always have `px` at the end
    },

    // DOC: #private
    getComputedStyles(el) {
      const { styleDirection } = this;
      const offset = el.getBoundingClientRect()[styleDirection];
      const computedStyles = window.getComputedStyle(el);
      return {
        offset,
        margin: this.doSanitizeStyles(computedStyles.getPropertyValue(`margin-${styleDirection}`)),
        padding: this.doSanitizeStyles(computedStyles.getPropertyValue(`padding-${styleDirection}`)),
        border: this.doSanitizeStyles(computedStyles.getPropertyValue(`border-${styleDirection}-width`)),
      };
    },

    // DOC: #private
    getOverflowOffset() {
      const elStyles = this.getComputedStyles(this.overflowEl);
      const elOffset = elStyles.offset - elStyles.padding;
      return elOffset;
    },

    // DOC: #private
    getOverflowChildOffset(el) {
      const elStyles = this.getComputedStyles(el);
      const elOffset = elStyles.offset + elStyles.margin + elStyles.border;
      return elOffset;
    },

    // DOC: #private
    doTabsCheck() {
      setTimeout(() => {
        const { tabs } = this;
        if (!tabs.length) {
          this.selectedTab = false;
          return;
        }
        const found = this.tabs.find(t => t === this.selectedTab);
        if (!found) this.doSelectTab(tabs[0]);

        this.doCalculateAvailbleTabs();
      });
    },

    // DOC: It is recommended that you wrap your tab nav in a container with no padding as the function does not take into account padding or margin
    doCalculateAvailbleTabs() {
      // TODO: below line may cause issues in future, like flashing UI on created
      this.lastVisibleTabIndex = this.tabs.length;

      this.$nextTick(() => {
        const { overflowEl, tabs } = this;
        if (!overflowEl) return;

        let tempLastVisibleTabIndex = 0;
        const elOffset = this.getOverflowOffset();

        // stop once true
        tabs.some((t, i) => {
          const elOffsetChild = this.getOverflowChildOffset(overflowEl.children[i]);
          if (elOffset < elOffsetChild) return true;
          tempLastVisibleTabIndex = i;
        });

        this.lastVisibleTabIndex = tempLastVisibleTabIndex;
      });
    },

    // DOC: exposed
    doSelectTab(tab) {
      this.selectedTab = tab;
    },

    // DOC: exposed
    isSelectedTab(tab) {
      return tab === this.selectedTab;
    },

    // DOC: #private
    hasWindowResized() {
      this.doCalculateAvailbleTabs();
    },
  },
  render() {
    return this.$scopedSlots.default({
      tabs: this.tabs,
      selectedTab: this.selectedTab,
      doSelectTab: this.doSelectTab,
      isSelectedTab: this.isSelectedTab,
      ...(this.hasOverflowEnabled ? {
        visibleTabs: this.visibleTabs,
        overflowTabs: this.overflowTabs,
      } : null),
    });
  },
};
</script>
