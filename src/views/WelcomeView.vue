<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear" mode="out-in">
                <component :is="Component" style="height: 100%" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
</script>

<style scoped></style>
