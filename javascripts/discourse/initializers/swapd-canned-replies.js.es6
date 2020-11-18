import { withPluginApi } from "discourse/lib/plugin-api";

function initTheme(api) {
  if (!Discourse.SiteSettings.canned_replies_enabled) return;

  const site = api.container.lookup("site:main");

  if (site.mobileView) return;

  const user = api.getCurrentUser();

  if (!user || !user.staff) return;

  const appEvents = api.container.lookup("service:app-events");
  const showCanned = () => {
    const composer = api.container.lookup("controller:composer");

    composer.send("showCannedRepliesButton");

    Ember.run.later(this, () => {
      $(".d-editor-textarea-wrapper textarea").focus();
    }, 760);
  };

  appEvents.on("composer:opened", this, showCanned);

  // api.modifyClass("controller:composer", {
  //   open(opts) {
  //     const orig = this._super(...arguments);
  //
  //     orig.then(() => {
  //       Ember.run.next(this, "swapdShowCanned");
  //     });
  //
  //     return orig;
  //   },
  //
  //   swapdShowCanned() {
  //     this.send("showCannedRepliesButton");
  //   }
  // });
}

export default {
  name: "swapd-canned-replies",
  // after: "add-canned-replies-ui-builder",

  initialize() {
    withPluginApi("0.8", initTheme);
  }
};
