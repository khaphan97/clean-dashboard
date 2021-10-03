<template>
	<div class="form-wrapper">
		<h2 class="form-title">{{ nodeId || 'Add New Node' }}</h2>
		<el-form label-position="top" class="form-container">
			<!-- Form Data Type, UI -->
			<el-row :gutter="10">
				<el-col :span="5">
					<el-form-item label="TYPE">
						<el-radio-group v-model="formData.type" :disabled="nodeId && true">
							<el-radio-button :label="type.label" v-for="(type, index) in typeData" :key="index">
								{{ type.text }}
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="UI">
						<el-radio-group v-model="formData.ui">
							<el-radio-button :label="type.label" v-for="(type, index) in uiData" :key="index">
								{{ type.text }}
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- End Form Data Type, UI -->

			<!-- Form Data Name, Text -->
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="Node Name">
						<el-input
							v-model="formData.name"
							placeholder="Input node name..."
							:disabled="nodeId && true"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Text">
						<el-input v-model="formData.text" placeholder="Input text..." />
					</el-form-item>
				</el-col>
			</el-row>
			<!-- END Form Data Type, UI -->

			<!-- Video Tite, URL -->
			<transition name="fade">
				<el-row :gutter="10" v-if="formData.type === 'video'">
					<el-col :span="12">
						<el-form-item label="Video Title">
							<el-input placeholder="Input Video Title..." v-model="formData.videoTitle" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Video Url">
							<el-input placeholder="Input Video Url..." v-model="formData.videoUrl" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-else>
					<el-form-item label="Regex">
						<el-input placeholder="Input Regex..." v-model="formData.regex"></el-input>
					</el-form-item>
				</el-row>
			</transition>
			<!-- END Video Title, URL-->

			<!-- Button -->
			<ButtonNode ref="ButtonComponent" :buttonNode="formData.buttons" />
			<!-- End Button -->

			<ConditionNode ref="ConditionComponent" :conditionNode="formData.condition" />

			<el-row style="margin: 30px 0">
				<el-col :span="24" style="margin-bottom: 10px">
					<el-button
						:type="nodeId ? 'success' : 'primary'"
						style="width: 100%;"
						@click="handleClickFormButton"
					>
						{{ nodeId ? 'Update' : 'Add' }}
					</el-button>
				</el-col>
				<el-col :span="24" v-if="nodeId">
					<el-popconfirm
						confirm-button-text="OK"
						cancel-button-text="No, Thanks"
						icon="el-icon-info"
						icon-color="red"
						title="Are you sure to delete this?"
						@confirm="handleConfirmDelete"
					>
						<el-button slot="reference" type="danger" style="width: 100%;">Delete</el-button>
					</el-popconfirm>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { uiData, typeData } from '@/constants/formData';
	import ButtonNode from './ButtonNode.vue';
	import ConditionNode from './ConditionNode.vue';

	const initFormData = {
		type: 'text',
		ui: 'regular',
		name: '',
		text: '',
		buttons: [],
		condition: [],
		regex: '',
		videoTitle: '',
		videoUrl: '',
	};

	export default {
		components: { ButtonNode, ConditionNode },
		name: 'form-component',
		props: ['botData'],
		data() {
			return {
				nodeId: this.$route.params.id,
				formData: { ...initFormData },
				uiData,
				typeData,
			};
		},
		methods: {
			async handleClickFormButton() {
				const newFormData = JSON.parse(JSON.stringify(this.formData));

				newFormData.buttons.forEach((btn) => {
					if (btn.event === 'capture') btn.data = JSON.stringify(btn.data);
				});

				this.$emit('handleCreateNode', {
					args: {
						nodeId: this.nodeId,
						formData: newFormData,
					},
					done: (isSuccess) => {
						if (isSuccess) {
							this.formData = {
								type: 'text',
								ui: 'regular',
								name: '',
								text: '',
								buttons: [],
								condition: [],
								regex: '',
								videoTitle: '',
								videoUrl: '',
							};
						}
					},
				});
			},
			handleConfirmDelete() {
				this.$emit('handleDeleteNode', this.nodeId);
			},
		},
		watch: {
			'$route.params.id': {
				handler(val) {
					if (val) {
						this.nodeId = val;
						this.formData = { ...this.botData.content.find((node) => node.name === val) };
					} else {
						this.nodeId = null;
						this.formData = { ...initFormData };
					}
				},
			},
		},
		created() {
			if (this.nodeId) {
				this.formData = { ...this.botData.content.find((node) => node.name === this.nodeId) };
			} else {
				this.formData = { ...initFormData };
			}
		},
		mounted() {
			this.$watch('$refs.ButtonComponent.buttons', (new_value) => {
				this.formData.buttons = new_value;
			});
			this.$watch('$refs.ConditionComponent.condition', (new_value) => {
				this.formData.condition = new_value;
			});
		},

		updated() {
			console.log('Render form');
		},
	};
</script>

<style>
	.form-wrapper {
		max-height: calc(95vh - 60px);
		max-width: 100%;
		overflow-y: auto;
	}

	.form-container {
		padding: 20px;
		border: 1px solid #dadada;
		border-radius: 3px;
	}

	.form-title {
		text-align: center;
		padding: 10px;
	}
</style>
