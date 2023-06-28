<template>
    <el-card class="box-card" shadow="never">
        <template #header>
            <span>筛选搜索</span>
        </template>
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="输入搜索：">
                <el-input v-model="queryForm.text" placeholder="用户名/邮箱" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">搜索</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px;">
        <div style="display: inline;">
            <span>数据列表</span>
        </div>
        <div style="display: inline;float: right;">
            <el-button>添加</el-button>
        </div>
    </el-card>
    <div style="width: auto; height: 480px;margin-top: 30px;">
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column v-for="item in tabColumn" :key="item.index" :prop="item.prop" :label="item.label"
                align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" show-overflow-tooltip>
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="assignRoles(scope.row.username)">分配角色</el-button>
                    <el-button link type="primary" size="small" @click="showEdit(scope.row.id ,scope.row.username, scope.row.email)">编辑</el-button>
                    <el-button link type="danger" @click="deleteUser(scope.row.id)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="example-pagination-block">
        <el-pagination background=true layout="prev, pager, next" :total=total @current-change="current_change"
            style="float: right" />
    </div>
    <el-dialog v-model="assignRolesVisible" title="分配角色" width="30%">
        <el-select v-model="role" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="assignRolesVisible = false">取消</el-button>
                <el-button type="primary" @click="chageRole">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="editVisible" title="修改信息" width="30%">
        <el-form :model="editForm">
            <el-form-item>
                <el-input type="text" v-model="editForm.username" placeholder="用户名" clearable>
                    <template #prefix>
                        <el-icon>
                            <User />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="editForm.email" placeholder="邮箱" clearable>
                    <template #prefix>
                        <el-icon>
                            <Message />
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editVisible = false">取消</el-button>
                <el-button type="primary" @click="edit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {User, Message} from '@element-plus/icons-vue'
import { get, post } from "@/net";
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from "element-plus";
const queryForm = reactive({
    text: '',
})
const tabColumn = [
    { prop: "id", label: "ID" },
    { prop: "username", label: "用户名" },
    { prop: "email", label: "邮箱" }
]
const loading = ref(false)
const total = ref()//总条数
const pageSize = ref(10)//指定展示多少条
const currentPage = ref(1)//当前页码
const current_change = (cp) => {
    currentPage.value = cp;
    getList()
}
const tableData = ref()
const getList = () => {
    loading.value = true;
    post('api/user/findUser', {
        text: queryForm.text,
        currPage: currentPage.value,
        pageSize: pageSize.value
    }, (message) => {
        loading.value = false;
        tableData.value = message;
    })
}
const getTotal = () => {
    get('api/user/getUserCount', (message) => {
        total.value = message
    })
}
const role = ref('')
const assignRolesVisible = ref(false)
const assignRoles = (username) => {
    assignRolesVisible.value = true
    post('api/role/findRoleByUsernameOrEmail', {
        text: username
    }, (message) => {
        role.value = message.name
    })
}
const chageRole = () => {
    post('api/role/updateRole', {
        name: role.value
    }, (message) => {
        ElMessage.success(message)
    }, (message) => {
        ElMessage.error(message)
    })
}
const options = [
    {
        value: '用户',
        label: '用户',
    },
    {
        value: '管理员',
        label: '管理员',
    },
    {
        value: '超级管理员',
        label: '超级管理员',
    }
]
const editForm = reactive({
    username: '',
    email: '',
})

const editVisible = ref(false)
const showEdit = (id, username, email) => {
    editVisible.value = true
    editForm.id = id
    editForm.username = username
    editForm.email = email
}
const edit = () => {
    post('api/user/updateUser', {
        id: editForm.id,
        username: editForm.username,
        email: editForm.email
    }, (message) => {
        ElMessage.success(message)
        editVisible.value = false
        getList()
    }, (message) => {
        ElMessage.error(message)
    })
}
const deleteUser = (uid) => {
    post('api/user/deleteUser', {
        id: uid
    }, (message) => {
        ElMessage.success(message)
        getList()
    }, (message) => {
        ElMessage.error(message)
        getList()
    })
}
onMounted(() => {
    getList()
    getTotal()
})
</script>

<style scoped></style>
