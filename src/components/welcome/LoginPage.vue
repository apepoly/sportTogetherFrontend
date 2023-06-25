<template>
    <div class="form">
        <el-card class="box-card">
            <template #header>
                <h1 style="text-align: center;">登录</h1>
            </template>
            <el-form :model="form" class="demo-form">
                <el-form-item label="账号：">
                    <el-input v-model="form.username" type="text" placeholder="请输入账号" clearable />
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" clearable>
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
import { reactive } from 'vue';
import router from "@/router";

const form = reactive({
    username: '',
    password: '',
    remember: false
})

const login = () => {

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
