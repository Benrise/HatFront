<template>
    <div class="double-input">
        <Input :placeholder="props.placeholders[0]" @input="$emit('update:modelValue1', $event.target.value)" :class="props.class"/>
        <Separator class="w-4 bg-foreground"/>
        <Input :placeholder="props.placeholders[1]" @input="$emit('update:modelValue2', $event.target.value)" :class="props.class"/>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';

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
    }
})

defineEmits(['update:modelValue1', 'update:modelValue2']);

</script>

<style scoped lang="scss">
@import './styles';
</style>