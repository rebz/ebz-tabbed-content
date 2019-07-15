// https://stackoverflow.com/questions/50556294/vuejs-render-vnode
export default {
  functional: true,
  mounted() {
    console.info(this.$props);
  },
  render: (h, ctx) => ctx.props.vnode,
};
