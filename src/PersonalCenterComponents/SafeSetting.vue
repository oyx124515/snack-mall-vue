<template>
  <div class="safe-setting-content">
    <p class="title">安全设置</p>
    <div class="item-div">
      <div>
        <div><span>修改账户</span></div>
        <div><span>建议定期修改账户密码，确保账户安全</span></div>
      </div>
      <div>
        <span @click="handeCheckPwd">修改</span>
      </div>
    </div>
    <!--    -->
    <div class="item-div">
      <div>
        <div><span>密保问题</span></div>
        <div><span>设置密保问题，密保问题可有效保护账户安全</span></div>
      </div>
      <div>
        <span @click="handlePwdPq">修改</span>
      </div>
    </div>
  </div>
  <password-setting ref="safeSettings"></password-setting>
  <password-protect-question ref="pwdPq"></password-protect-question>
</template>

<script setup>
import PasswordSetting from '@/PersonalCenterComponents/SafeSettingComponents/PasswordSetting'
import PasswordProtectQuestion from '@/PersonalCenterComponents/SafeSettingComponents/PasswordProtectQuestion'
import {ref} from "vue";

const safeSettings = ref()
const pwdPq = ref()


function handeCheckPwd() {
  safeSettings.value.handleEdit()
}

function handlePwdPq() {
  pwdPq.value.handleEdit()
}
</script>

<style scoped>
.safe-setting-content {
  padding: 20px;
  min-width: 800px;
}

.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;

}

.item-div {
  display: flex;
  justify-content: space-between;
}

.item-div div:first-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-div div:first-child div:first-child {
  font-size: 16px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.85);
}

.item-div div:first-child div:first-child:hover {
  color: #1890ff;
}

.item-div div:first-child div:nth-child(2) {
  margin-top: 10px;
  font-size: 12px;
  line-height: 12px;
  color: #00000073
}

.item-div div:nth-child(2) {
  color: #1890ff;
}

.item-div > div:nth-child(2):hover {
  opacity: .85;
  cursor: pointer;
}
</style>