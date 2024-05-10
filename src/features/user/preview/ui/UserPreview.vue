<template>
    <Dialog>
        <DialogTrigger as-child>
        <slot/>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
            Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
                Name
            </Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right">
                Username
            </Label>
            <Input id="username" value="@peduarte" class="col-span-3" />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">
            Save changes
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    </template>

<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
</script>
<style scoped>

</style>