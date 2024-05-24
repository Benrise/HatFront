<template>
    <Dialog class="update-avatar">
      <DialogTrigger as-child>
        <Button size="icon" class="update-avatar__edit"><IconPencil/></Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader class="flex flex-col gap-2">
          <DialogTitle>Загрузка фотографии</DialogTitle>
          <DialogDescription>
            Поддерживаемые форматы: JPG, JPEG, PNG. Максимальный размер: 2 МБ
          </DialogDescription>
        </DialogHeader>
        <transition name="fade" mode="out-in">
          <div v-if="avatarSrc !== '#'" class="upload__delete">
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="secondary">Удалить аватар </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить аватар?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Действие нельзя будет отменить, и оно будет выполнено немедленно.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction @click="removeAvatar">Удалить</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </transition>
        <label for="avatar" class="update-avatar__upload upload">
          <Input @change="onFileChange($event)" accept=".jpg,.jpeg,.png" id="avatar" type="file"/>
          <div class="upload__area">
            <IconCloud class="upload__icon"/>
            <div class="upload__body">
              <p class="upload__text">Перетащите файл для загрузки</p>
              <p class="upload__text">или</p>
              <Button @click="(e) => e.target?.parentElement?.click()" class="text-foreground" variant="link">выберите с устройства</Button>
            </div>
          </div>
        </label>
        <transition name="fade" mode="out-in">
          <div v-if="uploadedFile" class="upload__uploaded">
            <Separator v-if="uploadedFile"/>
            <div class="upload__file file">
              <div class="file__main">
                <div class="file__format">
                  {{ uploadedFile?.type.split('/')[1] }}
                </div>
                <div class="file__text">
                  <div class="file__name">
                    {{ uploadedFile?.name }}
                  </div>
                  <div class="file__size">
                    {{ calculateFileSize(uploadedFile?.size || 0) }}
                  </div>
                </div>
              </div>
              <Button @click="clearFile" class="text-foreground" size="icon" variant="destructive">
                <IconXmark/>
              </Button>
            </div>
            <Button @click="uploadFile" :loading="isLoading" class="w-full">
              Загрузить файл
            </Button>
          </div>
        </transition>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useToast } from '@/shared/ui/toast';
  
  import { Button } from '@/shared/ui/button';
  import { Separator } from '@/shared/ui/separator';
  
  import IconPencil from '~icons/heroicons/pencil';
  import IconCloud from '~icons/heroicons/cloud-arrow-up-solid';
  import IconXmark from '~icons/heroicons/x-mark-20-solid';
  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/shared/ui/dialog'
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/shared/ui/alert-dialog'
  
  import { Input } from '@/shared/ui/input';
  
  const { toast } = useToast();
  
  defineProps({
    avatarSrc: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(['update-avatar', 'remove-avatar']);
  
  const uploadedFile = ref<File>();
  
  const clearFile = (e: Event) => {
    uploadedFile.value = undefined;
    e.preventDefault();
  };
  
  const onFileChange = (e: any) => {
    const maxFileSizeInMB = 2;
    const maxFileSizeInKB = 1024 * 1024 * maxFileSizeInMB;
  
    const file = e.target.files[0]
  
    if (file.size > maxFileSizeInKB) {
        toast({
            variant: 'destructive',
            title: `Превышен максимальный размер файла`,
            description: `Файл ${file.name} не загружен. Максимальный размер - ${maxFileSizeInMB} МБ.`,
        });
        return
    }
  
    uploadedFile.value = file;
  };
  
  const uploadFile = () => {
    if (uploadedFile.value) {
      emit('update-avatar', uploadedFile.value);
    }
  };
  
  const calculateFileSize = (bytes: number) => {
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    if (bytes === 0) {
      return '0 Байт';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  
  const removeAvatar = () => {
    emit('remove-avatar');
  }
  </script>
  
  <style scoped lang="scss">
  .update-avatar {
    &__edit {
        position: absolute;
        border-radius: 999px;
        bottom: 12px;
        right: 12px;
        outline: 6px solid hsl(var(--background));
        z-index: 50;
      }
  }

  .upload {
    display: flex;
    flex-direction: column;
    gap: 24px;
  
    input[type="file"] {
      display: none;
    }
  
    &__area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @include adaptiveValue('padding', 64, 16);
      border: 2px dashed hsl(var(--border));
      @include adaptiveValue('gap', 12, 8);
      border-radius: 12px;
  
      transition: all 0.2s ease-in-out;
  
      &:hover {
        background-color: hsl(var(--muted));
      }
    }
  
    &__icon {
      @include adaptiveValue('width', 64, 32);
      @include adaptiveValue('height', 64, 32);
    }
  
    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        text-align: center;
        @include body();
      }
    }

    &__delete {
      display: flex;
      width: 100%;
    }
  
    &__text {
      color: hsl(var(--muted-foreground)) !important;
    }
  
    &__uploaded {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media screen and (max-width: 640px) {
        &__delete {
            justify-content: center;
        }
    }
  }
  
  .file {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    @include body();
  
    &__format {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background-color: hsl(var(--secondary));
      line-height: 0;
      font-size: 12px;
    }
  
    &__text {
      display: flex;
      flex-direction: column;
    }
  
    &__name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 264px;
    }
  
    &__main {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  
    &__size {
      color: hsl(var(--muted-foreground));
    }
  }
  </style>
  