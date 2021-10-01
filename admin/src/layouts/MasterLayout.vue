<template>
	<div class="home">
		<el-container>
			<el-aside width="200px" id="main-aside">
				<AsideComponent />
			</el-aside>
			<el-container id="content">
				<el-header>
					<HeaderComponent />
				</el-header>
				<el-main>
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts">
	import AsideComponent from '@/components/AsideComponent.vue';
	import HeaderComponent from '@/components/HeaderComponent.vue';
	import Vue from 'vue';

	export default Vue.extend({
		name: 'MasterLayout',
		components: { AsideComponent, HeaderComponent },
	});
</script>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}

	.el-header {
		border-bottom: 1px solid #bdbdbd;
		display: flex;
		align-items: center;
	}
	.el-main {
		padding: 0;
	}

	#main-aside {
		position: fixed;
		top: 0;
		left: 0;
	}

	#content {
		margin-left: 200px;
	}
</style>
