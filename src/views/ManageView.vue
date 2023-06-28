<template>
    <div class="common-layout">
        <el-container>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="activeIndex" class="el-menu" @select="handleSelect" :router="true"
                        active-text-color="#ffd04b" style="position: absolute; bottom: 0;top: 0; width: 200px;">
                        <el-menu-item index="/manage">主页</el-menu-item>
                        <el-menu-item index="/userList">用户列表</el-menu-item>
                        <el-menu-item index="/postList">体育馆列表</el-menu-item>
                        <el-menu-item index="/newsList">体育馆场地</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
.common-layout {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
