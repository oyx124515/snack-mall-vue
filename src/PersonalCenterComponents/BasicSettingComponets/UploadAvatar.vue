<template>
  <!--  上传头像的组件-->
  <div style="min-width: 800px">
    <a-modal
        title="修改头像"
        :visible="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        :width="800"
        :footer="null"
        @cancel="cancelHandel"
    >
      <!--    row start -->
      <a-row>
        <a-col :xs="24" :md="12" :style="{height: '350px'}">
          <vue-cropper
              ref="cropper"
              :img="options.img"
              :info="true"
              :autoCrop="options.autoCrop"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :fixedBox="options.fixedBox"
              @realTime="realTime"
          >
          </vue-cropper>
        </a-col>
        <a-col :xs="24" :md="12" :style="{height: '350px'}">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img"/>
          </div>
        </a-col>
      </a-row>
      <!--    row end -->
      <br>
      <a-row>
        <a-col :lg="2" :md="2">
          <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
            <a-button>上传图片</a-button>
          </a-upload>
        </a-col>
        <a-col :lg="{span: 1, offset: 2}" :md="2">
          <a-button type="primary" @click="changeScale(1)">
            <template #icon>
              <PlusOutlined/>
            </template>
          </a-button>
        </a-col>


        <a-col :lg="{span: 1, offset: 1}" :md="2">
          <!--        <a-button icon="minus" @click="changeScale(-1)"/>-->

          <a-button type="primary" @click="changeScale(-1)">
            <template #icon>
              <MinusOutlined/>
            </template>
          </a-button>


        </a-col>
        <a-col :lg="{span: 1, offset: 1}" :md="2">
          <a-button type="primary" @click="rotateLeft">
            <template #icon>
              <RotateLeftOutlined/>
            </template>
          </a-button>

        </a-col>
        <a-col :lg="{span: 1, offset: 1}" :md="2">
          <a-button type="primary" @click="rotateRight">
            <template #icon>
              <RotateRightOutlined/>
            </template>
          </a-button>
        </a-col>
        <a-col :lg="{span: 2, offset: 6}" :md="2">
          <a-button type="primary" @click="finish('blob')">保存</a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>

</template>

<script setup>
//导入icon
import {PlusOutlined, MinusOutlined, RotateLeftOutlined, RotateRightOutlined} from '@ant-design/icons-vue';
import {inject, reactive, ref} from "vue";

import VueCropper from "@/PersonalCenterComponents/BasicSettingComponets/vue-cropper";
import {request} from "@/request";
import {message} from "ant-design-vue";

const visible = ref(false)
const confirmLoading = ref(true)
const options = reactive({
  img: '',
  autoCrop: true,
  autoCropWidth: 200,
  autoCropHeight: 200,
  fixedBox: true
})
let previews = reactive({
  url: "",
  img: ""
})

// methods
function cancelHandel() {
  visible.value = false
}

function realTime(data) {
  previews.url = data.url
  previews.img = data.img
}

function beforeUpload(file) {
  const reader = new FileReader()
  // 把Array Buffer转化为blob 如果是base64不需要
  // 转化为base64
  reader.readAsDataURL(file)
  reader.onload = () => {
    options.img = reader.result
  }
  // 转化为blob
  // reader.readAsArrayBuffer(file)

  return false
}

const cropper = ref()
const showEdit = () => {
  visible.value = true
}

function changeScale(num) {
  num = num || 1
  cropper.value.changeScale(num)
}

function rotateLeft() {
  cropper.value.rotateLeft()
}


function rotateRight() {
  cropper.value.rotateRight()
}

const checkImg = inject("checkImg")

// 上传图片
function finish() {
  cropper.value.getCropBlob(
      (data) => {
        let formData = new FormData();
        formData.set("file", data)
        request(
            {
              url: "/uploadNewAvatar/",
              method: "post",
              data: formData,
              headers: {token: window.localStorage.getItem("token")}
            }
        ).then(
            (resp) => {
              let data = resp.data
              if (data.code === 0) {
                message.success("修改头像成功");
                checkImg(data.message);
                visible.value = false;
              } else {
                message.error("修改头像失败")
              }

            },
            () => message.error("上传失败")
        )
      }
  )
}

// eslint-disable-next-line no-undef
defineExpose({showEdit})
</script>
<style scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}

.avatar-upload-preview img {
  width: 100%;
  height: 100%;
}
</style>