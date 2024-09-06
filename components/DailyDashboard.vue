<template>
  <div>
    <div class="flex justify-between">
      <div>
        <UButton
          icon="mdi-arrow-left-thick"
          label="วันก่อนหน้า"
          :to="`?date=${previousDate}`"
        />
      </div>
      <div v-if="!moment(nextDate).isSameOrAfter(moment())" class="text-right">
        <UButton
          trailing-icon="mdi-arrow-right-thick"
          label="วันถัดไป"
          :to="`?date=${nextDate}`"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-center">
      <span class="text-base md:text-2xl text-gray mr-2"
        >{{ displayDay }}:</span
      >
      <span class="text-xl md:text-3xl font-bold">{{ displayDate }}</span>
    </div>
    <div
      v-if="trackerList.value && trackerList.value.length > 0"
      class="space-y-4"
    >
      <ViewTrackerItem
        v-for="item in trackerList.value"
        :key="item.id"
        :item="item"
      />
    </div>
    <div v-else class="min-h-[300px] flex flex-col items-center justify-center gap-6">
      <p class="text-gray italic">ยังไม่มีข้อมูลของวันนี้</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import { type ITracker } from "./types";
import ViewTrackerItem from "./ViewTrackerItem.vue";
const props = defineProps<{
  date: string;
}>();

const { auth } = useSupabaseClient();
const {
  data: { user },
} = await auth.getUser();

const client = useSupabaseClient();
const trackerList = ref<ITracker[]>([]);
const previousDate = computed(() =>
  moment(props.date).subtract(1, "days").format("YYYY-MM-DD")
);
const nextDate = computed(() =>
  moment(props.date).add(1, "days").format("YYYY-MM-DD")
);
const displayDay = computed(() => moment(props.date).format("ddd"));
const displayDate = computed(() => moment(props.date).format("D MMMM YYYY"));

const fetchTrackers = async (date: string) => {
  const { data: trackers } = await useAsyncData("trackers", async () => {
    const { data } = await client
      .from("trackers")
      .select(
        "*, projects (id, name, code), profiles:created_by (id, display_name)"
      )
      .eq("tracker_date", date)
      .order("id", { ascending: true });

    return data;
  });

  trackerList.value = trackers;
};

fetchTrackers(props.date);

watch(
  () => props.date,
  (date: string) => {
    fetchTrackers(date);
  }
);
</script>
