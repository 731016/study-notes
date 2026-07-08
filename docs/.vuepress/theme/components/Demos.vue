<script setup lang="ts">
interface Demo {
    name: string
    desc: string
    logo: string
    repo: string
    url: string
    preview: string
}

defineProps<{
    list: Demo[]
}>()
</script>

<template>
    <div class="demos">
        <div v-for="demo in list" :key="demo.url" class="demo-item">
            <div class="demo-img">
                <a :href="demo.url" target="_blank" rel="noopener noreferrer">
                    <img :src="demo.preview" :alt="demo.name" loading="lazy">
                </a>
            </div>
            <div class="demo-content">
                <h3 class="demo-title">
                    <span v-if="demo.logo" class="logo" :style="`background-image: url(${demo.logo})`" />
                    <span class="title">
                        <a :href="demo.url" target="_blank" rel="noopener noreferrer" :aria-label="demo.name"
                            :title="demo.name">{{ demo.name }}</a>
                    </span>
                    <a v-if="demo.repo" :href="demo.repo" class="github" target="_blank" rel="noopener noreferrer"
                        :aria-label="`Link to GitHub: ${demo.name}`">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        <!-- <span class="vpi-simple-icons-github" /> -->
                    </a>
                </h3>
                <p :title="demo.desc">
                    {{ demo.desc }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.demos {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 20px 16px;
    width: 100%;
}

@media (min-width: 768px) {
    .demos {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

.demo-item {
    overflow: hidden;
    border: solid 1px var(--vp-c-divider);
    border-radius: 8px;
    box-shadow: var(--vp-shadow-1);
    transition: var(--vp-t-color);
    transition-property: border;
}

.demo-item:hover {
    box-shadow: var(--vp-shadow-3);
}

.demo-img {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    overflow: hidden;
}

.demo-img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    object-fit: cover;
    transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
    transform: scale(1);
}

.demo-item:hover .demo-img img {
    transform: scale(1.05);
}

.demo-content {
    padding: 0 16px 12px;
}

.demo-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto 6px;
    font-size: 16px;
}

.demo-title .logo {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.demo-title .title {
    flex: 1 2;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.demo-title .title a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.demo-title .github {
    display: flex;
    margin-left: 10px;
    color: var(--vp-c-text-1);
}

.demo-content p {
    display: -webkit-box;
    margin: 6px auto 0;
    overflow: hidden;
    font-size: 14px;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
</style>