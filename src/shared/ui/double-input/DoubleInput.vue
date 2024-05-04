<template>
    <div class="double-input">
        <Input :placeholder="props.placeholders[0]" :class="props.class"/>
        <Separator class="w-4 bg-foreground"/>
        <Input :placeholder="props.placeholders[1]" :class="props.class"/>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';

const props = defineProps<{
    class: {
        type: [String, Number] | 'full',
        required: false,
    },
    placeholders: string[],
}>()

</script>

<style scoped lang="scss">
.double-input {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
}

</style>