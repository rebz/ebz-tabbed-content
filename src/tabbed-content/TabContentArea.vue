<script>
import Vue from 'vue';
// import VNode from './VNode';


export default {
  // todo: prop: `overflow-control: false`... if true will use JS to determine tabs that overflow
  // todo: option: set selected start, by index or object
  // todo: user define tab head area
  // todo: user define tab content area
  name: 'TabContentArea',
  props: {
    tabs: {
      required: false,
      default: () => [],
      type: Array,
    },
    overflowId: {
      required: false,
      default: false,
      type: [Boolean, String, Number],
    },
  },
  mounted() {
    console.info(this.overflowId);

    const el = document.getElementById(this.overflowId);

    console.info(el);
    // element.getBoundingClientRect().right


    // console.info(this.$scopedSlots.head);

    // this.$nextTick(() => {
    //   const VNodeArray = this.$slots.head;
    //   const item = VNodeArray[0];

    //   const DetailConstructor = Vue.extend(VNode);

    //   const rendered = new DetailConstructor({
    //     propsData: {
    //       vnode: item,
    //     },
    //   }, 500);

    //   rendered.$mount();

    //   // const el = rendered.$el;

    // // console.info(el);
    // });

    // console.info(VNode.render(item));
    // console.info(item);
    // console.info(this.$parent);

    // console.info(this.$scopedSlots.default);
    this.doTabsCheck();
  },
  data: () => ({
    selectedTab: false,
  }),
  // watch: {
  //   items: {
  //     handler() {
  //       this.doTabsCheck();
  //     },
  //   },
  // },
  methods: {
    doTabsCheck() {
      setTimeout(() => {
        // console.info(this.$slots);
        const { tabs } = this;
        if (!tabs.length) return false;
        this.selectedTab = tabs[0];
      });
    },
    doSelectTab(tab) {
      this.selectedTab = tab;
    },
    isSelectedTab(tab) {
      return tab === this.selectedTab;
    },
  },
  render(h, ctx) {
    const props = {
      tabs: this.tabs,
      selectedTab: this.selectedTab,
      doSelectTab: this.doSelectTab,
      isSelectedTab: this.isSelectedTab,
    };
    return this.$scopedSlots.default(props);
    // console.info(this.$scopedSlots.head());

    // const rendered = h(this.$scopedSlots.head());
    // console.info(rendered.context);
    // console.info(rendered.context.$el);
    // // console.info(this.$scopedSlots.head());

    // return h('div', [this.$scopedSlots.head(), this.$scopedSlots.default()]);

    // let children = null;

    // console.info(this.$scopedSlots);
    // return false;

    // return props.tag ? createElement(props.tag, context.data, children) : children;

    // const slots = context.slots();
    // const { props } = context;

    // const slotChildren = slots.default;
    // if (slotChildren) {
    //   const separator = slots.separator || props.separator;
    //   if (!separator) {
    //     children = slotChildren;
    //   } else {
    //     children = [];
    //     const slotChildrenCount = slotChildren.length;
    //     let index = 0; let
    //       hasChildToSeparate = false;
    //     while (index < slotChildrenCount) {
    //       let child = slotChildren[index];
    //       do {
    //         children.push(child);
    //         index += 1;
    //         if (index === slotChildrenCount) {
    //           break;
    //         }
    //         if (!hasChildToSeparate && (child.children || child.text)) {
    //           hasChildToSeparate = true;
    //         }
    //         child = slotChildren[index];
    //       } while (!child.children && !child.text);
    //       if (hasChildToSeparate && index < slotChildrenCount) {
    //         children.push(separator);
    //       }
    //     }
    //   }
    // }
  },
};
</script>
