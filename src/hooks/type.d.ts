export interface IGlobalHooksState {
    isShowTabbar: Ref<boolean>
    tabbarIndex: Ref<number>
    money_config: Ref<IMoneyConfigResDTO>
    encryption_wellet_address: Ref<string | null>
    wellet_address: Ref<string | null>
}

export interface IGlobalHooksDispatch {
    onShowTabbar: (val: boolean, index?: number) => void
    onGetMoneyConfig: () => Promise<void>
    onGetWellet: () => void
}

export interface IGlobalHooks extends IGlobalHooksState,IGlobalHooksDispatch{}