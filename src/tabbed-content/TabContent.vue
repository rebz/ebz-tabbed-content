<script>
export default {
  name: 'TabContent',
  mounted() {
    console.info('tab content');
    console.info(this.$slots);
    console.info(this.$scopedSlots);
  },
  render() {
    return this.$scopedSlots.default({
    });
  },
};
</script>
