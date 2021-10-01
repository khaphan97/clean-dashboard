<template>
	<p>Admin Dashboard</p>
</template>

<script>
	export default {
		methods: {
			goBack() {
				console.log('go back');
			},
		},
		created() {
			console.log(this.$route);
		},
	};
</script>
