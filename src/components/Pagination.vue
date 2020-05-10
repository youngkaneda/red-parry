<template>
    <div>
        <md-button class="md-icon-button" @click="firstPage()">
            <md-icon>first_page</md-icon>
        </md-button>
        <md-button
            class="md-icon-button"
            @click="previous()"
        >
            <md-icon>chevron_left</md-icon>
        </md-button>
        <md-button
            v-if="limit > size"
            class="md-icon-button"
            style="color: white"
            @click="previous()"
        >
            {{ page &lt; 2 ? 1 : '...' }}
        </md-button>
        <div v-for="(v, i) in pages()" style="display: inline" :key="i">
            <md-button
                :class="[page === i ? 'md-raised' : null, 'md-icon-button']"
                v-if="i < limit && i >= offset"
                @click="() => { page = i }"
            >
                {{ i + 1 }}
            </md-button>
        </div>
        <md-button
            v-if="limit < pages()"
            class="md-icon-button"
            :disabled="limit + 1 === pages()"
            @click="next()"
            style="color: white"
        >
            {{ limit + 1 === pages() ? pages() : '...' }}
        </md-button>
        <md-button
            v-if="limit + 1 < pages()"
            class="md-icon-button"
            @click="lastPage()"
            style="color: white"
        >
            {{ this.pages() }}
        </md-button>
        <md-button
            class="md-icon-button"
            @click="next()"
        >
            <md-icon>chevron_right</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="lastPage()">
            <md-icon>last_page</md-icon>
        </md-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 0,
            limit: null,
            offset: 0,
        }
    },
    props: {
        total: Number,
        reason: Number,
        size: Number,
    },
    created() {
        this.limit = this.size;
    },
    watch: {
        page(val) {
            this.$emit('pageChanged', val);
        },
    },
    methods: {
        firstPage() {
            this.page = 0;
            this.limit = this.size;
            this.offset = 0;
        },
        previous() {
            if (this.page > 0) {
                this.page--;
            }
            if (this.offset > this.page ) {
                this.limit--;
                this.offset--;
            }
        },
        next() {
            if (this.page < this.pages() - 1) {
                this.page++;
            }
            if (this.page + 1 > this.limit && this.page < this.pages()) {
                this.limit++;
                this.offset++;
            }
        },
        lastPage() {
            this.page = this.pages() - 1;
            this.limit = this.pages();
            this.offset = this.page + 1 - this.size;
        },
        pages() {
            let pages = Math.floor(this.total/this.reason);
            pages = this.total % this.reason ? pages + 1 : pages;
            return pages ? pages : 1;
        }
    }
}
</script>
