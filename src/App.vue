<script setup lang="ts">
import config from '@/config'

import PageHeader from './components/PageHeader.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <el-container>
    <el-header>
      <page-header></page-header>
    </el-header>
    <el-main>
      <router-view :key="route.fullPath" />
    </el-main>
    <el-footer>
      <el-text>Copyright © 2024
        <el-link target="_blank" href="https://1l1.icu">夏沫花火zzz🌙</el-link>.</el-text>
      <el-text>This site is still WIP. For full information looking-glass please see
        <el-link target="_blank" :href="config.full_url">Here</el-link>.</el-text>
    </el-footer>
  </el-container>
</template>
