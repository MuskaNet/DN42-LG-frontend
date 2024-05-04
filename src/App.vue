<script setup lang="ts">
import { RouterView } from 'vue-router'
import config from '@/config'
</script>

<template>
  <el-container>
    <el-header>
      <router-link style="color: white; text-decoration: none" to="/">
        <el-avatar
          style="margin-right: 0.6rem; transform: translateY(4px)"
          shape="square"
          :size="30"
          :src="config.site.icon"
        ></el-avatar>
        <h1 style="display: inline">{{ config.site.title }}</h1>
      </router-link>
      <el-divider style="margin-top: 0.6rem" />
      <!-- <el-menu-item index="1"></el-menu-item> -->
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <el-text
        >Copyright © 2024
        <el-link target="_blank" href="https://1l1.icu">夏沫花火zzz🌙</el-link>.</el-text
      >
      <el-text
        >This site is still WIP. For full information looking-glass please see
        <el-link target="_blank" :href="config.full_url">Here</el-link>.</el-text
      >
    </el-footer>
  </el-container>
</template>
