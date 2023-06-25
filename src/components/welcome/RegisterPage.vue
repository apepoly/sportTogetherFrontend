<template>
    <div class="form">
        <el-card class="box-card">
            <template #header>
                <h1 style="text-align: center;">注册</h1>
            </template>
            <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="form.username" :maxlength="8" type="text" placeholder="用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" :maxlength="16" type="password" placeholder="密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password_repeat">
                    <el-input v-model="form.password_repeat" :maxlength="16" type="password" placeholder="重复密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="form.email" type="email" placeholder="电子邮箱">
                        <template #prefix>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row :gutter="10" style="width: 100%">
                        <el-col :span="17">
                            <el-input v-model="form.code" :maxlength="6" placeholder="请输入电子邮件地址验证码" type="text">

                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="success" @click="validateEmail" :disabled="!isEmailValid || coldTime > 0">
                                {{ coldTime > 0 ? '请稍后' + coldTime + '秒' : '获取验证码' }}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 270px;margin-left: 40px;" type="warning" plain @click="register">立即注册</el-button>
                </el-form-item>
                <el-form-item>
                    <span style="font-size: 14px; color: gray;margin-left: 100px;">已有帐号？</span>
                    <el-link :underline="false" type="primary" style="translate: 0 -2px" @click="router.push('/')">立即登录</el-link>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import router from "@/router";
import { ElMessage } from "element-plus";
import { Lock, Message, User } from "@element-plus/icons-vue";
const form = reactive({
    username: '',
    password: '',
    password_repeat: '',
    email: '',
    code: ''
})
const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)) {
        callback(new Error('用户名只能包含中文或英文'))
    } else {
        callback()
    }
}
const validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.password) {
        callback(new Error("两次输入的密码不同"))
    } else {
        callback()
    }
}
const rules = {
    username: [
        { validator: validateUsername, trigger: ['blur', 'change'] },
        { min: 2, max: 8, message: '用户名长度必须在2-8个字符之间', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度必须在6-16个字符之间', trigger: ['blur', 'change'] },
    ],
    password_repeat: [
        { validator: validatePassword, trigger: ['blur', 'change'] },
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    code: [
        { required: true, message: '请输入获取的验证码', trigger: 'blur' }
    ]
}
const formRef = ref()
const isEmailValid = ref(false)
const coldTime = ref(0)
const onValidate = (prop, isValid) => {
    if (prop === 'email')
        isEmailValid.value = isValid
}
const validateEmail = () => {
    coldTime.value = 60
    post('/api/auth/valid-email', {
        email: form.email
    }, (message) => {
        ElMessage.success(message)
        setInterval(() => coldTime.value--, 1000)
    }, (message) => {
        ElMessage.warning(message)
        coldTime.value = 0
    })
}
</script>

<style scoped>
.box-card {
    width: 400px;
    height: 500px;
    margin: auto;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
</style>
