<template>
    <div class="double-input">
        <Input :class="props.class"/>
        <Separator class="w-4 bg-primary"/>
        <Input :class="props.class"/>
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/shared/ui/input';
import { Separator } from '@/shared/ui/separator';

const props = defineProps<{
    class: {
        type: [String, Number] | 'full',
        required: false,
    }
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