<template>
    <div class="form">
        <el-card class="box-card">
            <template #header>
                <h1 style="text-align: center;">登录</h1>
            </template>
            <el-form :model="form" class="demo-form">
                <el-form-item>
                    <el-input v-model="form.username" type="text" placeholder="请输入账号" clearable >
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable>
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox style="margin-left: 60px;" v-model="form.remember" label="记住我" size="large" />
                    <el-link :underline="false" style="margin-left: 166px;" @click="router.push('/forget')">忘记密码？</el-link>
                </el-form-item>
                <el-form-item>
                    <div style="margin-left: 80px;">
                        <el-button style="width: 100px;" type="primary" @click="login()">登录</el-button>
                        <el-button style="width: 100px;" type="warning" @click="router.push('/register')">注册</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import {get, post} from "@/net";
import router from "@/router";
import {useStore} from "@/stores";

const form = reactive({
    username: '',
    password: '',
    remember: false
})
const store = useStore()
const login = () => {
    if (!form.username || !form.password) {
    ElMessage.warning("请填写用户名和密码！")
  } else {
    post('/api/auth/login', {
      username: form.username,
      password: form.password,
      remember: form.remember,
    }, (message) => {
      ElMessage.success(message)
      get('api/user/me',(message) => {
        store.auth.user = message
        router.push('/')
      }, () => {
        store.auth.user = null
      })
      router.push('/welcome')
    })
  }
}

</script>

<style scoped>
.box-card {
    width: 400px;
    height: 400px;
    margin: auto;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
</style>
