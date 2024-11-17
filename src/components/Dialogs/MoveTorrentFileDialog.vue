<script setup lang="ts">
import { useDialog } from '@/composables'
import { useContentStore } from '@/stores'
import { nextTick, onBeforeMount, reactive, ref } from 'vue'
import { useI18nUtils } from '@/composables'
import { VForm } from 'vuetify/components/VForm'

const props = defineProps<{
  guid: string
  hash: string
  isFolder: boolean
  oldName: string
}>()

const { isOpened } = useDialog(props.guid)
const { t } = useI18nUtils()
const contentStore = useContentStore()

const form = ref<VForm>()
const input = ref<HTMLInputElement>()
const isFormValid = ref(false)
const formData = reactive({
  newName: ''
})

const rules = [(v: string) => !!v || t('dialogs.moveTorrent.required')]

async function submit() {
  await form.value?.validate()
  if (!isFormValid.value) return

  if (props.isFolder) {
    await contentStore.renameTorrentFolder(props.hash, props.oldName, formData.newName)
  } else {
    await contentStore.renameTorrentFile(props.hash, props.oldName, formData.newName)
  }

  close()
}

const close = () => {
  isOpened.value = false
}

function fixCase() {
  var s = formData.newName

  s = s.replace(/[ ]{2,}/g,' ')

  var parts = /(.*)([. ]v\d+.*)/.exec(s)
  if (parts?.length == 3) {
    parts[1] = parts[1].replace(/[_ ]/g,'.')
    parts[1] = parts[1].replace(/(\w)(\w*)/g,
         function(_g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
    parts[2] = parts[2].replace(/^ /g,'.')

    s = parts.slice(1).join('')
    s = s.trim()
    formData.newName = s
    return
  }

  s = s.replace(/[_ ]/g,'.')
  s = s.replace(/(\w)(\w*)/g,
        function(_g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});
  s = s.trim()

  formData.newName = s
}

const suffix = ref("-IGG")

function addSuffix() {
  var s = formData.newName
  s = s.replace(/(\.rar|\.zip|\.7z)$/i, '')
  s = s.replace(/-[A-Z0-9]{3}$/, '')
  s += suffix.value
  formData.newName = s
}

onBeforeMount(() => {
  formData.newName = props.oldName

  if (props.isFolder) {
    nextTick(() => input.value?.select())
  } else {
    const startIndex = formData.newName.lastIndexOf('/')
    const endIndex = formData.newName.lastIndexOf('.')

    nextTick(() => {
      input.value?.setSelectionRange(startIndex + 1, endIndex == -1 ? formData.newName.length : endIndex)
    })
  }
})
</script>

<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-title>{{ t('dialogs.moveTorrentFile.title', 1 + Number(isFolder)) }}</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid" ref="form" @submit.prevent>
          <v-text-field v-if="oldName" :model-value="oldName" disabled :label="$t('dialogs.moveTorrentFile.oldName')" />
          <v-text-field v-model="formData.newName" ref="input" :rules="rules" autofocus :label="$t('dialogs.moveTorrent.newPath')" @keydown.enter="submit" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="fixCase">Fix Case</v-btn>
        <v-select class="suffix" label="suffix" v-model="suffix" :items="['-IGG', '-P2P', '-GOG']"></v-select>
        <v-btn @click="addSuffix">Add Suffix</v-btn>
        <v-spacer />
        <v-btn color="error" @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-btn color="accent" :disabled="!isFormValid" @click="submit">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.suffix {
  max-width: 100px;
}
</style>
