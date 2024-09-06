<template>
  <div class="rounded-lg ring-1 ring-gray-200 p-2">
    <UAlert
      v-show="alertFormError"
      icon="mdi-information"
      color="red"
      variant="solid"
      title="ข้อมูลไม่ครบ!"
      description="กรุณากรอกข้อมูลและรายละเอียดงานให้ครบถ้วน"
      class="mb-4"
    />
    <UForm class="space-y-4" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <USelectMenu
          v-model="selectedType"
          :options="typeOptions"
          placeholder="เลือกประเภทงาน"
          value-attribute="value"
          option-attribute="label"
          searchable
        />
        <USelectMenu
          v-model="selectedProj"
          :options="projectOptions"
          placeholder="เลือก Project"
          value-attribute="id"
          option-attribute="name"
          searchable
        />
        <USelectMenu
          v-model="selectedTiming"
          :options="timingOptions"
          placeholder="เวลาที่ใช้ (ชั่วโมง)"
        />
      </div>
      <UTextarea
        v-model="detail"
        color="white"
        variant="outline"
        placeholder="ระบุรายละเอียดงาน..."
      />

      <div class="flex justify-end gap-2">
        <UButton variant="outline" label="ยกเลิก" @click="handleCancel" />
        <UButton type="submit" icon="mdi-check" label="บันทึก" />
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { TRACKER_TYPE_OPTIONS } from "../constants/tracker_types";
import { type ITracker } from "./types";

const props = defineProps<{
  item: ITracker;
}>();

const emit = defineEmits(["cancel", "success-update"]);

const client = useSupabaseClient();

const { data: projects } = await useAsyncData("projects", async () => {
  const { data } = await client
    .from("projects")
    .select("id, name")
    .order("created_at", { ascending: true });

  return data;
});

const typeOptions = TRACKER_TYPE_OPTIONS;

const projectOptions = projects;

const timingOptions = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8,
];

const selectedType = ref(props.item.tracker_type);
const selectedProj = ref(props.item.project_id);
const selectedTiming = ref(props.item.timing);
const detail = ref(props.item.detail.replaceAll('<br />', '\n'));

const toast = useToast();

const alertFormError = ref(false);

const onSubmit = async () => {
  if (
    selectedType.value === undefined ||
    selectedTiming.value === undefined ||
    selectedProj.value === undefined
  ) {
    alertFormError.value = true;
    return;
  }

  alertFormError.value = false;
  const { error } = await client
    .from("trackers")
    .update({
      detail: detail.value.replace(/\r?\n/g, '<br />'),
      timing: selectedTiming.value,
      tracker_type: selectedType.value.value,
      project_id: selectedProj.value,
    })
    .eq("id", props.item.id);

  if (error) {
    toast.add({
      icon: "mdi-close-circle",
      title: "แก้ไขข้อมูลไม่สำเร็จ",
      description: error.message,
      color: "red",
    });
  } else {
    toast.add({
      icon: "mdi-check-circle",
      title: "แก้ไขข้อมูลสำเร็จ",
      color: "green",
    });
    emit("success-update");
  }
};

const handleCancel = () => {
  emit("cancel");
};
</script>
