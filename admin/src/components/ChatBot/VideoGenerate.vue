<template>
	<el-scrollbar class="list-video-wrapper">
		<el-row>
			<el-form>
				<el-form-item label="Callback ID">
					<el-input type="text" :value="callbackId" placeholder="abc@example.com" disabled />
				</el-form-item>

				<el-form-item label="Description">
					<el-input type="text" v-model="formVideo.description" placeholder="Video description" />
				</el-form-item>

				<el-form-item label="Template">
					<el-select v-model="formVideo.templateId" filterable placeholder="Select template...">
						<el-option
							v-for="template in templates"
							:key="template.id"
							:label="template.title"
							:value="template.id"
						/>
					</el-select>
				</el-form-item>

				<template v-if="selectedTemplate && selectedTemplate.variables.length > 0">
					<h3>Template Data</h3>
					<el-form-item
						v-for="(index, variable) in selectedTemplate.variables"
						:key="index"
						:label="variable"
					>
						<el-input type="text" v-model="formVideo.templateData[variable]" />
					</el-form-item>
				</template>

				<el-form-item label="Test Mode">
					<el-switch v-model="formVideo.test"> </el-switch>
				</el-form-item>
			</el-form>
		</el-row>
	</el-scrollbar>
</template>

<script>
	import { getListTemplates } from '@/api/synthesia';

	export default {
		props: ['callbackId'],
		data() {
			return {
				formVideo: {
					test: true,
					description: '',
					templateId: '',
					templateData: {},
					visibility: 'public',
				},
				templates: [],
				selectedTemplate: null,
			};
		},
		async created() {
			const { data } = await getListTemplates();
			this.templates = data.templates.templates;
		},
		watch: {
			'formVideo.templateId': {
				handler(val) {
					this.selectedTemplate = this.templates.find((temp) => temp.id === val);

					this.selectedTemplate.variables.reduce((acc, v) => {
						acc[v] = '';
						return acc;
					}, this.formVideo.templateData);
				},
			},
		},
	};
</script>
