<template>
    <div class="double-input">
        <Input :placeholder="props.placeholders[0]" v-model="fromValue" :class="props.class"/>
        <Separator class="w-4 bg-foreground"/>
        <Input :placeholder="props.placeholders[1]" v-model="toValue" :class="props.class"/>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';
import { computed } from 'vue';

const props = defineProps({
    class: {
        type: String,
        required: false,
        default: () => 'w-full',
    },
    placeholders: {
        type: Array,
        required: true,
        default: () => ['Значение', 'Значение'],
    },
    modelValue: {
        type: String,
        required: true,
        default: () => '',
    }
})

const emit = defineEmits(['update:modelValue']);

const fromValue = computed({
      get: () =>
        props.modelValue?.split(
          ',',
        )[0],
      set: (value) => {
        emit('update:modelValue', `${value ? value : ''},${toValue.value}`);
      },
    });
    const toValue = computed({
      get: () =>
        props.modelValue?.split(',')[1] == 'null'
          ? ''
          : props.modelValue?.split(',')[1] || '',
      set: (value) => {
        emit('update:modelValue', `${fromValue.value},${value ? value : ''}`);
      },
    });

</script>

<style scoped lang="scss">
@import './styles';
</style>