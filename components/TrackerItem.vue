<template>
  <div>
    <TrackerUpdateForm
      v-if="showUpdateForm"
      :item="item"
      @cancel="handleCancelUpdate"
      @success-update="handleSuccessUpdate"
    />
    <div
      v-else
      class="border-l-8 border-l-primary rounded-lg ring-1 ring-gray-200 p-2"
    >
      <div class="flex justify-between item-center">
        <div class="flex flex-col md:flex-row gap-2 text-primary md:items-center items-start">
          <div class="flex gap-2">
            <UIcon name="mdi-clock" class="w-5 h-5 mb-1" />
            <p class="font-bold">{{ item.timing }} hr.</p>
            <p>{{ TRACKER_TYPE_LABEL[item.tracker_type] }}</p>
          </div>
          <UBadge
            :color="item.projects.code === 'non-project' ? 'gray' : 'primary'"
            variant="soft"
            ># {{ item.projects.name }}</UBadge
          >
        </div>
        <div class="space-x-2">
          <UButton
            variant="soft"
            color="gray"
            trailing-icon="mdi-pencil"
            @click="updateTracker"
          />
          <UButton
            variant="soft"
            color="gray"
            trailing-icon="mdi-trash"
            @click="deleteTracker"
          />
        </div>
      </div>
      <div class="mt-2">
        <p v-html="item.detail"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { type ITracker } from "./types";
import { TRACKER_TYPE_LABEL } from "../constants/tracker_types";
import TrackerUpdateForm from "./TrackerUpdateForm.vue";

const emit = defineEmits(["refresh"]);

const props = defineProps<{
  item: ITracker;
}>();

const showUpdateForm = ref(false);

const updateTracker = () => {
  showUpdateForm.value = true;
};

const handleCancelUpdate = () => {
  showUpdateForm.value = false;
};

const handleSuccessUpdate = () => {
  emit("refresh");
  showUpdateForm.value = false;
};

const toast = useToast();
const client = useSupabaseClient();

const deleteTracker = async () => {
  const { error } = await client
    .from("trackers")
    .delete()
    .eq("id", props.item.id);

  if (error) {
    toast.add({
      icon: "mdi-close-circle",
      title: "ลบข้อมูลไม่สำเร็จ",
      description: error.message,
      color: "red",
    });
  } else {
    emit("refresh");
  }
};
</script>
