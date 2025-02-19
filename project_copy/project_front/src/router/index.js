import { createRouter, createWebHistory } from "vue-router";

// 페이지 컴포넌트들 import @:src 가리킴
import NoticePage from "@/views/NoticePage.vue";
import PatchNotesPage from "@/views/PatchNotesPage.vue";
import UpdatesPage from "@/views/UpdatesPage.vue";
import InquiriesPage from "@/views/InquiriesPage.vue";

// 각 url에 맞는 페이지 컴포넌트 연결
const routes = [
    { path: '/notices', component: NoticePage },
    { path: '/patch-notes', component: PatchNotesPage },
    { path: '/updates', component: UpdatesPage },
    { path: '/inquiries', component: InquiriesPage }, 
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;