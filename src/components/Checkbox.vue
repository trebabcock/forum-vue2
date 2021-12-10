<template>
  <div>
    <div class="checkbox-form">
      <div class="answers">
        <label class="item">
          <span
            >I have read and agree to the stuff. Yes so much fucking stuff to
            read, get the fuck over it. Don't be a little bitch.</span
          >
          <input
            id="check"
            v-model="checked"
            type="checkbox"
            @change="onChange"
          />
          <span class="checkmark" />
        </label>
      </div>
    </div>
  </div>
</template>
