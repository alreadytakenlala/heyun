Component({

  methods: {

    onHC() {
      this.triggerEvent("hideComponent");
    },

    /**
     * 选择拍照
     */
    onTakePhoto() {
      this.triggerEvent("takePhoto");
    },

    /**
     * 相册选择
     */
    onOpenAlbum() {
      this.triggerEvent("getFromAlbum");
    }
  }
})
