! function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).minigame = {})
}(this, function (e) {
	"use strict";

	function t(e, s, a, c) {
		return new (a = a || Promise)(function (i, t) {
			function r(e) {
				try {
					o(c.next(e))
				} catch (e) {
					t(e)
				}
			}

			function n(e) {
				try {
					o(c.throw(e))
				} catch (e) {
					t(e)
				}
			}

			function o(e) {
				var t;
				e.done ? i(e.value) : ((t = e.value) instanceof a ? t : new a(function (e) {
					e(t)
				})).then(r, n)
			}
			o((c = c.apply(e, s || [])).next())
		})
	}
	var i = {
		OK: "OK",
		UNSUPPORTED_API: "UNSUPPORTED_API",
		TIMEOUT: "TIMEOUT",
		INVALID_PARAM: "INVALID_PARAM",
		NOT_READY: "NOT_READY",
		ADS_NO_FILL: "ADS_NO_FILL",
		AD_LOAD_FAILED: "AD_LOAD_FAILED",
		AD_DISMISSED: "AD_DISMISSED",
		AD_NOT_LOADED: "AD_NOT_LOADED",
		AD_ALREADY_LOADED: "AD_ALREADY_LOADED",
		AD_ALREADY_SHOWED: "AD_ALREADY_SHOWED"
	};
	const r = {
		CODE: i,
		OK: {
			code: i.OK,
			message: "Success"
		},
		TIMEOUT: {
			code: i.TIMEOUT,
			message: "timeout"
		},
		adLoadFail: {
			code: i.AD_LOAD_FAILED,
			message: "Ad load failed"
		},
		adDismissed: {
			code: i.AD_DISMISSED,
			message: "Ad dismissed"
		},
		adNotLoaded: {
			code: i.AD_NOT_LOADED,
			message: "Ad not loaded"
		},
		adAlreadyLoaded: {
			code: i.AD_ALREADY_LOADED,
			message: "Ad already loaded"
		},
		adAlreadyShowed: {
			code: i.AD_ALREADY_SHOWED,
			message: "Ad already showed"
		}
	};
	var n, o;

	function s(i, r) {
		return t(this, void 0, void 0, function* () {
			return new Promise((e, t) => {
				setTimeout(() => {
					try {
						r && r(), e()
					} catch (e) {
						t(e)
					}
				}, 1e3 * i)
			})
		})
	} (i = n = n || {})[i.INTERSTITIAL = 0] = "INTERSTITIAL", i[i.REWARDED_VIDEO = 1] = "REWARDED_VIDEO", i[i.BANNER = 2] = "BANNER", (i = o = o || {})[i.NONE = 0] = "NONE", i[i.NEW = 1] = "NEW", i[i.LOADING = 2] = "LOADING", i[i.LOADED = 3] = "LOADED", i[i.PLAYING = 4] = "PLAYING";
	const a = {
		code: "AD_INSTANCE_STILL_CREATING",
		message: "AdInstance is on creating."
	},
		c = {
			code: "EXCEED_MAX_AD_INSTANCE",
			message: "Max AD Instance allowed: 3"
		},
		d = {
			code: "NO_READY_AD_INSTANCE",
			message: "AD Instance Not Ready or Played too frequently"
		},
		l = {
			code: "NOT_READY_FOR_LOAD",
			message: "Not Ready for Load"
		},
		h = {
			code: "AD_IS_LOADING",
			message: "AD is Loading"
		},
		f = {
			code: "NOT_READY_FOR_PLAYING",
			message: "Not Ready for Playing"
		},
		u = {
			code: "AD_IS_PLAYING",
			message: "AD is Playing"
		},
		_ = {
			code: "NO_BANNER_AD",
			message: "No Banner Ad Instance"
		},
		p = {
			code: "API_NOT_SUPPORT",
			message: "API Not Support"
		},
		g = {
			code: "TOO_FAST_SHOW",
			message: "Too Fast To Show Ads"
		},
		m = {
			code: "NOT_PLAYING",
			message: "Ads Not Playing"
		},
		y = {
			code: "TOO_MANY_ERRORS",
			message: "Too Many Errors, Stop Next Action"
		},
		v = "RATE_LIMITED",
		A = "ADS_NO_FILL";

	function w(e, t, i) {
		return e && void 0 !== e[t] ? e[t] : i
	}
	class I {
		constructor(e, t) {
			this._lastShowTime = 0, this._refreshInterval = 0, this._refreshInterval = 0 < e ? e : 0, (this._lastShowTime = 0) < t && (this._lastShowTime = Date.now() + 1e3 * t - 1e3 * this._refreshInterval)
		}
		isReadyToRefresh() {
			return this.getNextRefreshInterval() <= 0
		}
		getNextRefreshInterval() {
			let e = 0;
			var t;
			return 0 < this._refreshInterval && 0 < this._lastShowTime && (t = Date.now(), e = this._refreshInterval - (t - this._lastShowTime) / 1e3), e
		}
		updateLastShowTime() {
			this._lastShowTime = Date.now()
		}
	}
	class E {
		constructor(e, t, i, r) {
			this._maxLoadError = 0, this._errorCounter = 0, this._fatalError = !1, this._sharedTimer = null, this._adId = e, this._state = o.NONE, this._type = t, this._sharedTimer = i, this._fatalError = !1, console.assert(!!i, "sharedTimer is invalid", i), this._maxLoadError = w(r, "maxLoadError", 0)
		}
		getStateName() {
			return function (e) {
				let t = "NONE";
				switch (e) {
					case o.NEW:
						t = "NEW";
						break;
					case o.LOADING:
						t = "LOADING";
						break;
					case o.LOADED:
						t = "LOADED";
						break;
					case o.PLAYING:
						t = "PLAYING"
				}
				return t
			}(this._state)
		}
		getAdTypeName() {
			return this._type === n.INTERSTITIAL ? "Interstitial" : this._type === n.REWARDED_VIDEO ? "RewardedVideo" : this._type === n.BANNER ? "Banner" : "UNKNOWN"
		}
		getInfo() {
			return `[${this.getAdTypeName()}:${this._adId}:${this.getStateName()}]`
		}
		isReadyToRefresh() {
			return this._sharedTimer.isReadyToRefresh()
		}
		getNextRefreshInterval() {
			return this._sharedTimer.getNextRefreshInterval()
		}
		updateLastShowTime() {
			this._sharedTimer.updateLastShowTime()
		}
		increaseErrorCounter() {
			this._errorCounter++
		}
		resetErrorCounter() {
			this._errorCounter = 0
		}
		setFatalError() {
			this._fatalError = !0
		}
		isErrorTooMany() {
			return this._fatalError || 0 < this._maxLoadError && this._errorCounter >= this._maxLoadError
		}
	}
	class B extends E {
		constructor(e, t, i, r) {
			super(e, t, i, r), this._adInstance = null, this._autoLoadOnPlay = w(r, "autoLoadOnPlay", !1)
		}
		loadAsync() {
			return t(this, void 0, void 0, function* () {
				if (null === this._adInstance) {
					if (this._state !== o.NONE) throw console.log("Ad Instance is still creating: " + this.getInfo()), a;
					this._state = o.NEW, console.log("Get Ad Instance: " + this.getInfo()), this._adInstance = yield this.createAdInstanceAsync(this._adId)
				}
				if (this._state !== o.NEW) throw console.log("Not ready for preload: " + this.getInfo()), this._state === o.LOADING ? (console.log("Ad is loading, do not reload" + this.getInfo()), h) : l;
				if (this.isErrorTooMany()) throw console.log("Too many errors, stop loading: " + this.getInfo()), y;
				try {
					return this._state = o.LOADING, console.log("Start Loading: " + this.getInfo()), yield this._adInstance.loadAsync(), this._state = o.LOADED, this.resetErrorCounter(), console.log("Loading Success: " + this.getInfo()), !0
				} catch (e) {
					var t;
					throw console.info("Loading Failed: " + this.getInfo(), e), e.code === A ? (console.info("Ads Not Fill, stop loading: " + this.getInfo()), this.setFatalError()) : (this.increaseErrorCounter(), this._state = o.NEW, t = 10 * this._errorCounter + 1, console.log("Reload after " + t + " seconds: " + this.getInfo()), this.safeReLoadAsync(t)), e
				}
			})
		}
		isReady() {
			return null !== this._adInstance && this._state === o.LOADED
		}
		safeReLoadAsync(e = 1) {
			return t(this, void 0, void 0, function* () {
				s(e, () => t(this, void 0, void 0, function* () {
					try {
						yield this.loadAsync()
					} catch (e) {
						console.info("Reload Error: ", e)
					}
				})).catch(e => {
					console.info("Reload failed: " + this.getInfo(), e)
				})
			})
		}
		showAsync() {
			return t(this, void 0, void 0, function* () {
				if (!this.isReady()) throw console.log("Not Ready for play: " + this.getInfo()), this._state === o.PLAYING ? u : f;
				if (!this.isReadyToRefresh()) throw console.log("Play too frequently, wait for " + this.getNextRefreshInterval() + " seconds: " + this.getInfo()), g;
				try {
					return this._state = o.PLAYING, console.log("Play Ads: " + this.getInfo()), yield this._adInstance.showAsync(), console.log("Play Success: " + this.getInfo()), this._adInstance = null, this._state = o.NONE, this.updateLastShowTime(), this._autoLoadOnPlay && (console.log("Reload after 1 seconds: " + this.getInfo()), this.safeReLoadAsync(1)), !0
				} catch (e) {
					throw console.log("Play Failed: " + this.getInfo(), e), e.code === v ? this._state = o.LOADED : (this._adInstance = null, this._state = o.NONE, this._autoLoadOnPlay && (console.log("Reload after 1 seconds: " + this.getInfo()), this.safeReLoadAsync(1))), e
				}
			})
		}
	}
	class x extends B {
		constructor(e, t, i) {
			super(e, n.INTERSTITIAL, t, i)
		}
		createAdInstanceAsync(e) {
			return t(this, void 0, void 0, function* () {
				return yield FBInstant.getInterstitialAdAsync(this._adId)
			})
		}
	}
	class S extends B {
		constructor(e, t, i) {
			super(e, n.REWARDED_VIDEO, t, i)
		}
		createAdInstanceAsync(e) {
			return t(this, void 0, void 0, function* () {
				return yield FBInstant.getRewardedVideoAsync(this._adId)
			})
		}
	}
	class R extends E {
		constructor(e, t, i) {
			super(e, n.BANNER, t, i)
		}
		showAsync() {
			return t(this, void 0, void 0, function* () {
				if (!this.isReadyToRefresh()) throw console.log("Play too frequently, wait for " + this.getNextRefreshInterval() + " seconds: " + this.getInfo()), g;
				if (this.isErrorTooMany()) throw console.log("Too many errors, stop: " + this.getInfo()), y;
				if (this._state === o.LOADING) throw console.info("Banner is loading, wait for it: " + this.getInfo()), h;
				try {
					this._state = o.LOADING, console.log("Show Banner: " + this.getInfo()), yield FBInstant.loadBannerAdAsync(this._adId), this._state = o.PLAYING, console.log("Show Banner Success: " + this.getInfo()), this.updateLastShowTime(), this.resetErrorCounter()
				} catch (e) {
					throw console.info("Show Banner Failed: " + this.getInfo(), e), e.code === v ? this._state = o.NONE : e.code === A ? (console.info("Ads Not Fill, Stop: " + this.getInfo()), this.setFatalError()) : (this.increaseErrorCounter(), this._state = o.NONE), e
				}
			})
		}
		hideAsync() {
			return t(this, void 0, void 0, function* () {
				if (this._state !== o.PLAYING) throw console.log("No Banner Playing: " + this.getInfo()), m;
				try {
					console.log("Hide Banner: " + this.getInfo()), yield FBInstant.hideBannerAdAsync(), this._state = o.NONE
				} catch (e) {
					throw console.info("Hide Banner Failed: " + this.getInfo(), e), e
				}
			})
		}
	}
	class D {
		static getVersion() {
			return "1.0.4"
		}
		static initAdOption(e) {
			try {
				this._fb_max_ad_instance = e.fb_max_ad_instance, this._fb_init_ad_count = e.fb_init_ad_count, this.defaultInterstitialOption = {
					autoLoadOnPlay: e.fb_auto_load_on_play,
					maxLoadError: e.fb_max_interstitial_error
				}, this.defaultRewardedVideoOption = {
					autoLoadOnPlay: e.fb_auto_load_on_play,
					maxLoadError: e.fb_max_rewarded_video_error
				}, this.defaultBannerOption = {
					autoLoadOnPlay: e.fb_auto_load_on_play,
					maxLoadError: e.fb_max_banner_error
				}, this.defaultInterstitialTimerOption = {
					refreshInterval: e.fb_interstitial_refresh_interval,
					delayForFirstAd: e.fb_ad_delay_for_first_interstitial
				}, this.defaultRewardedVideoTimerOption = {
					refreshInterval: e.fb_rewarded_video_refresh_interval,
					delayForFirstAd: e.fb_ad_delay_for_first_rewarded_video
				}, this.defaultBannerTimerOption = {
					refreshInterval: e.fb_banner_refresh_interval,
					delayForFirstAd: e.fb_ad_delay_for_first_banner
				}, console.log("FBAdManager initAdOption success")
			} catch (e) {
				console.info("FBAdManager initAdOption error", e)
			}
		}
		static addInterstitial(t, i = this._fb_init_ad_count) {
			null == this._interstitialTimer && (this._interstitialTimer = new I(this.defaultInterstitialTimerOption.refreshInterval, this.defaultInterstitialTimerOption.delayForFirstAd));
			for (let e = 0; e < i; e++) {
				if (this._interstitialAds.length >= this._fb_max_ad_instance) throw console.log("Fail to add interstitial, too many instances: " + this._interstitialAds.length, t), c;
				var r = new x(t, this._interstitialTimer, this.defaultInterstitialOption);
				this._interstitialAds.push(r), console.log("Add Interstitial: " + t, "count: " + this._interstitialAds.length)
			}
			return this._interstitialAds.length
		}
		static addRewardedVideo(t, i = this._fb_init_ad_count) {
			null === this._rewardedVideoTimer && (this._rewardedVideoTimer = new I(this.defaultRewardedVideoTimerOption.refreshInterval, this.defaultRewardedVideoTimerOption.delayForFirstAd));
			for (let e = 0; e < i; e++) {
				if (this._rewardedVideos.length >= this._fb_max_ad_instance) throw console.log("Fail to add RewardedVideo, too many instances: " + this._rewardedVideos.length, t), c;
				var r = new S(t, this._rewardedVideoTimer, this.defaultRewardedVideoOption);
				this._rewardedVideos.push(r), console.log("Add RewardedVideo: " + t, "count: " + this._rewardedVideos.length)
			}
			return this._rewardedVideos.length
		}
		static addBanner(e) {
			null == this._bannerTimer && (this._bannerTimer = new I(this.defaultBannerTimerOption.refreshInterval, this.defaultBannerTimerOption.delayForFirstAd));
			var t = new R(e, this._bannerTimer, this.defaultBannerOption);
			return this._banners.push(t), console.log("Add Banner: " + e, "count: " + this._banners.length), t
		}
		static loadAll() {
			return t(this, void 0, void 0, function* () {
				return yield this.loadAllAsync()
			})
		}
		static loadAllAsync() {
			return t(this, void 0, void 0, function* () {
				console.log("FBAdManager Version: " + this.getVersion()), console.log("Init Ads Queue");
				for (let e = 0; e < this._rewardedVideos.length; e++) {
					const t = this._rewardedVideos[e];
					0 < e && (yield s(.1));
					try {
						yield t.loadAsync()
					} catch (e) { }
				}
				for (let e = 0; e < this._interstitialAds.length; e++) {
					const i = this._interstitialAds[e];
					0 < e && (yield s(.1));
					try {
						yield i.loadAsync()
					} catch (e) { }
				}
			})
		}
		static _isAdReady(e) {
			var t = e === n.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos;
			let i = !1;
			for (let e = 0; e < t.length; e++) {
				const r = t[e];
				if (r.isReady() && r.isReadyToRefresh()) {
					i = !0;
					break
				}
			}
			return i
		}
		static _showAsync(e) {
			var t = e === n.INTERSTITIAL ? this._interstitialAds : this._rewardedVideos;
			let i = null;
			for (let e = 0; e < t.length; e++) {
				const r = t[e];
				if (r.isReady() && r.isReadyToRefresh()) {
					i = r;
					break
				}
			}
			if (null != i) return i.showAsync();
			throw d
		}
		static _getAdTimer(e) {
			return e === n.INTERSTITIAL ? this._interstitialTimer : e === n.REWARDED_VIDEO ? this._rewardedVideoTimer : this._bannerTimer
		}
		static isInterstitialAdReady() {
			return this._isAdReady(n.INTERSTITIAL)
		}
		static showInterstitialAd() {
			return t(this, void 0, void 0, function* () {
				return yield this._showAsync(n.INTERSTITIAL)
			})
		}
		static isRewardedVideoReady() {
			return this._isAdReady(n.REWARDED_VIDEO)
		}
		static showRewardedVideo() {
			return t(this, void 0, void 0, function* () {
				return yield this._showAsync(n.REWARDED_VIDEO)
			})
		}
		static checkApiSupport(e) {
			return 0 <= FBInstant.getSupportedAPIs().indexOf(e)
		}
		static isBannerSupport() {
			return void 0 === this._bannerSupport && (this._bannerSupport = this.checkApiSupport("loadBannerAdAsync")), this._bannerSupport
		}
		static isBannerReady() {
			if (this._banners.length <= 0) throw _;
			const e = this._banners[0];
			return e.isReadyToRefresh()
		}
		static showBannerAsync() {
			return t(this, void 0, void 0, function* () {
				if (!this.isBannerSupport()) throw p;
				if (this._banners.length <= 0) throw _;
				const e = this._banners[0];
				return yield e.showAsync()
			})
		}
		static hideBannerAsync() {
			return t(this, void 0, void 0, function* () {
				if (!this.isBannerSupport()) throw p;
				if (this._banners.length <= 0) throw _;
				const e = this._banners[0];
				return yield e.hideAsync()
			})
		}
	}
	D._interstitialAds = [], D._rewardedVideos = [], D._banners = [], D._interstitialTimer = null, D._rewardedVideoTimer = null, D._bannerTimer = null, D._bannerSupport = void 0, D._fb_max_ad_instance = 1, D._fb_init_ad_count = 1, D.defaultInterstitialOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 3
	}, D.defaultRewardedVideoOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 3
	}, D.defaultBannerOption = {
		autoLoadOnPlay: !0,
		maxLoadError: 1
	}, D.defaultInterstitialTimerOption = {
		refreshInterval: 40,
		delayForFirstAd: 30
	}, D.defaultRewardedVideoTimerOption = {
		refreshInterval: 0,
		delayForFirstAd: 0
	}, D.defaultBannerTimerOption = {
		refreshInterval: 40,
		delayForFirstAd: 0
	};
	const b = class Vt {
		constructor() {
			this._test = !1, this._enabled = !1, this._isAndroidApp = !1
		}
		static get instance() {
			return this._instance || (this._instance = new Vt), this._instance
		}
		get isTest() {
			return this._test
		}
		get enabed() {
			return this._enabled
		}
		get isAndroidApp() {
			return this._isAndroidApp
		}
		load(e) {
			try {
				var t = e.options;
				this._test = e.isTest, this._enabled = e.enabled, this._isAndroidApp = e.isAndroidApp || !1, D.initAdOption(t);
				var i = e.config;
				D.addBanner(i.banner), D.addInterstitial(i.interstitial), D.addRewardedVideo(i.rewarded_video), D.loadAllAsync()
			} catch (e) {
				console.log("load ads options error: ", e)
			}
		}
		showInterstitial() {
			return D.showInterstitialAd().then(() => Promise.resolve()).catch(e => Promise.reject(e))
		}
		showRewardedVideo() {
			return D.showRewardedVideo().then(() => Promise.resolve()).catch(e => Promise.reject(e))
		}
		showBanner() {
			return D.showBannerAsync().then(() => Promise.resolve()).catch(e => Promise.reject(e))
		}
		hideBanner() {
			return D.hideBannerAsync().then(() => Promise.resolve()).catch(e => Promise.reject(e))
		}
		isRewardvideoReady() {
			return D.isRewardedVideoReady()
		}
		isInterstitialReady() {
			return D.isInterstitialAdReady()
		}
		isBannerReady() {
			return D.isBannerReady()
		}
	}.instance;
	class O {
		constructor() {
			this._configUrl = "", this._gameId = "", this._appId = "", this._channel = "", this._channelName = "", this._minigameOption = null, this._playPageData = null, this._locationSearch = ""
		}
		get configUrl() {
			return this._configUrl
		}
		get gameId() {
			return this._gameId
		}
		get appId() {
			return this._appId
		}
		get channel() {
			return this._channel
		}
		get channelName() {
			return this._channelName
		}
		get minigameOption() {
			return this._minigameOption
		}
		get playPageData() {
			return this._playPageData
		}
		set playPageData(e) {
			this._playPageData = e
		}
		get locationSearch() {
			return this._locationSearch = window.location.search, this._locationSearch
		}
		static get instance() {
			return this._instance || (this._instance = new O), this._instance
		}
		init(e) {
			this._channel = this.getSubChannelName(), this._channelName = this.getChannelName(), this._minigameOption = e, this._gameId = `${e.game_id}`, this._appId = `${e.app_id}`, this._locationSearch = window.location.search, window.commonInfo = O
		}
		getChannelName() {
			return window.globalPlatformInfo.channelName || window.channelName || this._playPageData.channelName
		}
		getSubChannelName() {
			return window.globalPlatformInfo.subChannelName || window.subChannelName || this._playPageData.subChannelName
		}
		getChannelConfigId() {
			return this._playPageData.channelConfigId
		}
		getGameManifestJsonUrl() {
			return this._playPageData.gameManifestJsonUrl
		}
		isH5AndroidApp() {
			return this._minigameOption ? this._minigameOption.android ? this._minigameOption.android.enabled : (console.warn("minigame config has not android field!!!"), !1) : (console.warn("minigame config is not exist!!!"), !1)
		}
		isAdflyEnable() {
			return this._minigameOption ? this._minigameOption.cpl ? this._minigameOption.cpl.adflyer ? this._minigameOption.cpl.adflyer.enabled : (console.warn("cpl config has not adflyer field!!!"), !1) : (console.warn("minigame config has not cpl field!!!"), !1) : (console.warn("minigame config is not exist!!!"), !1)
		}
		getAdflyChannelID() {
			return this.isAdflyEnable() ? this._minigameOption.cpl.adflyer.channelId : ""
		}
	}
	O._instance = null;
	const T = O.instance;
	class k {
		constructor(e, t, i) {
			this.type = e, this.isOneWay = t, this._serviceHandler = i
		}
		onRequest(e) {
			return t(this, void 0, void 0, function* () {
				return this._serviceHandler ? this._serviceHandler(e) : Promise.resolve(L(e))
			})
		}
	}

	function N(e, t, i, r) {
		return {
			type: `${e.type}_RESPONSE`,
			requestType: e.type,
			requestId: e.requestId,
			code: t,
			message: i,
			payload: r
		}
	}

	function L(e, t) {
		return N(e, r.OK.code, r.OK.message, t)
	}
	class P extends k {
		static createRequest() {
			return {
				type: P.requestType
			}
		}
		static createService() {
			return new P(P.requestType, !1, P.handleRequestAsync)
		}
		static handleRequestAsync(i) {
			return new Promise((e, t) => {
				e(L(i, T))
			})
		}
	}
	P.requestType = "CommonInfoService";
	class C {
		constructor() {
			this._commonInfo = null
		}
		get commonInfo() {
			return this._commonInfo
		}
		static get instance() {
			return this._instance || (this._instance = new C), this._instance
		}
		init() {
			return t(this, void 0, void 0, function* () {
				try {
					return yield this.getCommonInfo(), Promise.resolve()
				} catch (e) {
					return Promise.reject({
						code: "MINIGAMEIFNO_INIT_ERROR",
						message: e.message
					})
				}
			})
		}
		getCommonInfo() {
			return window.mediationClient.invokeServiceAsync(P.createRequest()).then(e => (this._commonInfo = e.payload, Promise.resolve(this._commonInfo))).catch(e => (console.error("get commonInfo error: ", e), Promise.reject({
				code: "GET_COMMONINFO_ERROR",
				message: e.message
			})))
		}
		getLocationSearch() {
			try {
				return this._commonInfo._locationSearch
			} catch (e) {
				return console.error("====> get loation error: ", e), ""
			}
		}
		isH5Android() {
			return !!this._commonInfo && (!!this._commonInfo._minigameOption && (!!this._commonInfo._minigameOption.android && this._commonInfo._minigameOption.android.enabled))
		}
		isAdflyCplEnable() {
			return !!this._commonInfo && (!!this._commonInfo._minigameOption && (!!this._commonInfo._minigameOption.cpl && (!!this._commonInfo._minigameOption.cpl.adflyer && this._commonInfo._minigameOption.cpl.adflyer.enabled)))
		}
	}
	C._instance = null;
	const H = C.instance;
	class F extends k {
		static createRequest(e) {
			return {
				type: F.requestType,
				payload: e
			}
		}
		static createService() {
			return new F(F.requestType, !1, F.handleRequestAsync)
		}
		static handleRequestAsync(e) {
			if (window.AdInteractive) return window.AdInteractive.trackEvent(e.payload), console.info(`====> android trackEvent ${e.payload}`), Promise.resolve(L(e)); {
				const t = "ANDROID_INSTANCE_ERROR",
					i = "Android AdInteractive not exist";
				return Promise.resolve(N(e, t, i))
			}
		}
	}
	F.requestType = "AndroidLogEventService";
	var M = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		i = {
			exports: {}
		};
	var z, G = {
		exports: {}
	};

	function V() {
		return z ? G.exports : (z = 1, G.exports = function (d) {
			var r;
			if (!(r = !(r = !(r = "undefined" != typeof window && window.crypto ? window.crypto : r) && "undefined" != typeof window && window.msCrypto ? window.msCrypto : r) && void 0 !== M && M.crypto ? M.crypto : r)) try {
				r = require("crypto")
			} catch (e) { }
			var i = Object.create || function (e) {
				return t.prototype = e, e = new t, t.prototype = null, e
			};

			function t() { }
			var e = {},
				n = e.lib = {},
				o = n.Base = {
					extend: function (e) {
						var t = i(this);
						return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
							t.$super.init.apply(this, arguments)
						}), (t.init.prototype = t).$super = this, t
					},
					create: function () {
						var e = this.extend();
						return e.init.apply(e, arguments), e
					},
					init: function () { },
					mixIn: function (e) {
						for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
						e.hasOwnProperty("toString") && (this.toString = e.toString)
					},
					clone: function () {
						return this.init.prototype.extend(this)
					}
				},
				l = n.WordArray = o.extend({
					init: function (e, t) {
						e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
					},
					toString: function (e) {
						return (e || a).stringify(this)
					},
					concat: function (e) {
						var t = this.words,
							i = e.words,
							r = this.sigBytes,
							n = e.sigBytes;
						if (this.clamp(), r % 4)
							for (var o = 0; o < n; o++) {
								var s = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
								t[r + o >>> 2] |= s << 24 - (r + o) % 4 * 8
							} else
							for (o = 0; o < n; o += 4) t[r + o >>> 2] = i[o >>> 2];
						return this.sigBytes += n, this
					},
					clamp: function () {
						var e = this.words,
							t = this.sigBytes;
						e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e.length = d.ceil(t / 4)
					},
					clone: function () {
						var e = o.clone.call(this);
						return e.words = this.words.slice(0), e
					},
					random: function (e) {
						for (var t = [], i = 0; i < e; i += 4) t.push(function () {
							if (r) {
								if ("function" == typeof r.getRandomValues) try {
									return r.getRandomValues(new Uint32Array(1))[0]
								} catch (e) { }
								if ("function" == typeof r.randomBytes) try {
									return r.randomBytes(4).readInt32LE()
								} catch (e) { }
							}
							throw new Error("Native crypto module could not be used to get secure random number.")
						}());
						return new l.init(t, e)
					}
				}),
				s = e.enc = {},
				a = s.Hex = {
					stringify: function (e) {
						for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
							var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
							r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16))
						}
						return r.join("")
					},
					parse: function (e) {
						for (var t = e.length, i = [], r = 0; r < t; r += 2) i[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
						return new l.init(i, t / 2)
					}
				},
				c = s.Latin1 = {
					stringify: function (e) {
						for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
							var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
							r.push(String.fromCharCode(o))
						}
						return r.join("")
					},
					parse: function (e) {
						for (var t = e.length, i = [], r = 0; r < t; r++) i[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
						return new l.init(i, t)
					}
				},
				h = s.Utf8 = {
					stringify: function (e) {
						try {
							return decodeURIComponent(escape(c.stringify(e)))
						} catch (e) {
							throw new Error("Malformed UTF-8 data")
						}
					},
					parse: function (e) {
						return c.parse(unescape(encodeURIComponent(e)))
					}
				},
				f = n.BufferedBlockAlgorithm = o.extend({
					reset: function () {
						this._data = new l.init, this._nDataBytes = 0
					},
					_append: function (e) {
						"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
					},
					_process: function (e) {
						var t, i = this._data,
							r = i.words,
							n = i.sigBytes,
							o = this.blockSize,
							s = n / (4 * o),
							a = (s = e ? d.ceil(s) : d.max((0 | s) - this._minBufferSize, 0)) * o,
							n = d.min(4 * a, n);
						if (a) {
							for (var c = 0; c < a; c += o) this._doProcessBlock(r, c);
							t = r.splice(0, a), i.sigBytes -= n
						}
						return new l.init(t, n)
					},
					clone: function () {
						var e = o.clone.call(this);
						return e._data = this._data.clone(), e
					},
					_minBufferSize: 0
				});
			n.Hasher = f.extend({
				cfg: o.extend(),
				init: function (e) {
					this.cfg = this.cfg.extend(e), this.reset()
				},
				reset: function () {
					f.reset.call(this), this._doReset()
				},
				update: function (e) {
					return this._append(e), this._process(), this
				},
				finalize: function (e) {
					return e && this._append(e), this._doFinalize()
				},
				blockSize: 16,
				_createHelper: function (i) {
					return function (e, t) {
						return new i.init(t).finalize(e)
					}
				},
				_createHmacHelper: function (i) {
					return function (e, t) {
						return new u.HMAC.init(i, t).finalize(e)
					}
				}
			});
			var u = e.algo = {};
			return e
		}(Math))
	}
	var W, U = {
		exports: {}
	};

	function j() {
		return W ? U.exports : (W = 1, U.exports = (i = V(), function () {
			var e = i,
				t = e.lib,
				n = t.Base,
				o = t.WordArray,
				e = e.x64 = {};
			e.Word = n.extend({
				init: function (e, t) {
					this.high = e, this.low = t
				}
			}), e.WordArray = n.extend({
				init: function (e, t) {
					e = this.words = e || [], this.sigBytes = null != t ? t : 8 * e.length
				},
				toX32: function () {
					for (var e = this.words, t = e.length, i = [], r = 0; r < t; r++) {
						var n = e[r];
						i.push(n.high), i.push(n.low)
					}
					return o.create(i, this.sigBytes)
				},
				clone: function () {
					for (var e = n.clone.call(this), t = e.words = this.words.slice(0), i = t.length, r = 0; r < i; r++) t[r] = t[r].clone();
					return e
				}
			})
		}(), i));
		var i
	}
	var q, Y = {
		exports: {}
	};

	function $() {
		return q ? Y.exports : (q = 1, Y.exports = (t = V(), function () {
			var e, n;
			"function" == typeof ArrayBuffer && (e = t.lib.WordArray, n = e.init, (e.init = function (e) {
				if ((e = (e = e instanceof ArrayBuffer ? new Uint8Array(e) : e) instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e) instanceof Uint8Array) {
					for (var t = e.byteLength, i = [], r = 0; r < t; r++) i[r >>> 2] |= e[r] << 24 - r % 4 * 8;
					n.call(this, i, t)
				} else n.apply(this, arguments)
			}).prototype = e)
		}(), t.lib.WordArray));
		var t
	}
	var K, X = {
		exports: {}
	};

	function J() {
		return K ? X.exports : (K = 1, X.exports = (t = V(), function () {
			var n = t.lib.WordArray,
				e = t.enc;

			function s(e) {
				return e << 8 & 4278255360 | e >>> 8 & 16711935
			}
			e.Utf16 = e.Utf16BE = {
				stringify: function (e) {
					for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n += 2) {
						var o = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
						r.push(String.fromCharCode(o))
					}
					return r.join("")
				},
				parse: function (e) {
					for (var t = e.length, i = [], r = 0; r < t; r++) i[r >>> 1] |= e.charCodeAt(r) << 16 - r % 2 * 16;
					return n.create(i, 2 * t)
				}
			}, e.Utf16LE = {
				stringify: function (e) {
					for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n += 2) {
						var o = s(t[n >>> 2] >>> 16 - n % 4 * 8 & 65535);
						r.push(String.fromCharCode(o))
					}
					return r.join("")
				},
				parse: function (e) {
					for (var t = e.length, i = [], r = 0; r < t; r++) i[r >>> 1] |= s(e.charCodeAt(r) << 16 - r % 2 * 16);
					return n.create(i, 2 * t)
				}
			}
		}(), t.enc.Utf16));
		var t
	}
	var Z, Q = {
		exports: {}
	};

	function ee() {
		return Z ? Q.exports : (Z = 1, Q.exports = (e = V(), function () {
			var c = e.lib.WordArray;
			e.enc.Base64 = {
				stringify: function (e) {
					var t = e.words,
						i = e.sigBytes,
						r = this._map;
					e.clamp();
					for (var n = [], o = 0; o < i; o += 3)
						for (var s = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < i; a++) n.push(r.charAt(s >>> 6 * (3 - a) & 63));
					var c = r.charAt(64);
					if (c)
						for (; n.length % 4;) n.push(c);
					return n.join("")
				},
				parse: function (e) {
					var t = e.length,
						i = this._map;
					if (!(r = this._reverseMap))
						for (var r = this._reverseMap = [], n = 0; n < i.length; n++) r[i.charCodeAt(n)] = n;
					var o = i.charAt(64);
					return !o || -1 !== (o = e.indexOf(o)) && (t = o),
						function (e, t, i) {
							for (var r = [], n = 0, o = 0; o < t; o++) {
								var s, a;
								o % 4 && (s = i[e.charCodeAt(o - 1)] << o % 4 * 2, a = i[e.charCodeAt(o)] >>> 6 - o % 4 * 2, a = s | a, r[n >>> 2] |= a << 24 - n % 4 * 8, n++)
							}
							return c.create(r, n)
						}(e, t, r)
				},
				_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
			}
		}(), e.enc.Base64));
		var e
	}
	var te, ie = {
		exports: {}
	};

	function re() {
		return te ? ie.exports : (te = 1, ie.exports = (n = V(), function (c) {
			var e = n,
				t = e.lib,
				i = t.WordArray,
				r = t.Hasher,
				t = e.algo,
				S = [];
			! function () {
				for (var e = 0; e < 64; e++) S[e] = 4294967296 * c.abs(c.sin(e + 1)) | 0
			}();
			t = t.MD5 = r.extend({
				_doReset: function () {
					this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
				},
				_doProcessBlock: function (e, t) {
					for (var i = 0; i < 16; i++) {
						var r = t + i,
							n = e[r];
						e[r] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
					}
					var o = this._hash.words,
						s = e[t + 0],
						a = e[t + 1],
						c = e[t + 2],
						d = e[t + 3],
						l = e[t + 4],
						h = e[t + 5],
						f = e[t + 6],
						u = e[t + 7],
						_ = e[t + 8],
						p = e[t + 9],
						g = e[t + 10],
						m = e[t + 11],
						y = e[t + 12],
						v = e[t + 13],
						A = e[t + 14],
						w = e[t + 15],
						I = R(I = o[0], x = o[1], B = o[2], E = o[3], s, 7, S[0]),
						E = R(E, I, x, B, a, 12, S[1]),
						B = R(B, E, I, x, c, 17, S[2]),
						x = R(x, B, E, I, d, 22, S[3]);
					I = R(I, x, B, E, l, 7, S[4]), E = R(E, I, x, B, h, 12, S[5]), B = R(B, E, I, x, f, 17, S[6]), x = R(x, B, E, I, u, 22, S[7]), I = R(I, x, B, E, _, 7, S[8]), E = R(E, I, x, B, p, 12, S[9]), B = R(B, E, I, x, g, 17, S[10]), x = R(x, B, E, I, m, 22, S[11]), I = R(I, x, B, E, y, 7, S[12]), E = R(E, I, x, B, v, 12, S[13]), B = R(B, E, I, x, A, 17, S[14]), I = D(I, x = R(x, B, E, I, w, 22, S[15]), B, E, a, 5, S[16]), E = D(E, I, x, B, f, 9, S[17]), B = D(B, E, I, x, m, 14, S[18]), x = D(x, B, E, I, s, 20, S[19]), I = D(I, x, B, E, h, 5, S[20]), E = D(E, I, x, B, g, 9, S[21]), B = D(B, E, I, x, w, 14, S[22]), x = D(x, B, E, I, l, 20, S[23]), I = D(I, x, B, E, p, 5, S[24]), E = D(E, I, x, B, A, 9, S[25]), B = D(B, E, I, x, d, 14, S[26]), x = D(x, B, E, I, _, 20, S[27]), I = D(I, x, B, E, v, 5, S[28]), E = D(E, I, x, B, c, 9, S[29]), B = D(B, E, I, x, u, 14, S[30]), I = b(I, x = D(x, B, E, I, y, 20, S[31]), B, E, h, 4, S[32]), E = b(E, I, x, B, _, 11, S[33]), B = b(B, E, I, x, m, 16, S[34]), x = b(x, B, E, I, A, 23, S[35]), I = b(I, x, B, E, a, 4, S[36]), E = b(E, I, x, B, l, 11, S[37]), B = b(B, E, I, x, u, 16, S[38]), x = b(x, B, E, I, g, 23, S[39]), I = b(I, x, B, E, v, 4, S[40]), E = b(E, I, x, B, s, 11, S[41]), B = b(B, E, I, x, d, 16, S[42]), x = b(x, B, E, I, f, 23, S[43]), I = b(I, x, B, E, p, 4, S[44]), E = b(E, I, x, B, y, 11, S[45]), B = b(B, E, I, x, w, 16, S[46]), I = O(I, x = b(x, B, E, I, c, 23, S[47]), B, E, s, 6, S[48]), E = O(E, I, x, B, u, 10, S[49]), B = O(B, E, I, x, A, 15, S[50]), x = O(x, B, E, I, h, 21, S[51]), I = O(I, x, B, E, y, 6, S[52]), E = O(E, I, x, B, d, 10, S[53]), B = O(B, E, I, x, g, 15, S[54]), x = O(x, B, E, I, a, 21, S[55]), I = O(I, x, B, E, _, 6, S[56]), E = O(E, I, x, B, w, 10, S[57]), B = O(B, E, I, x, f, 15, S[58]), x = O(x, B, E, I, v, 21, S[59]), I = O(I, x, B, E, l, 6, S[60]), E = O(E, I, x, B, m, 10, S[61]), B = O(B, E, I, x, c, 15, S[62]), x = O(x, B, E, I, p, 21, S[63]), o[0] = o[0] + I | 0, o[1] = o[1] + x | 0, o[2] = o[2] + B | 0, o[3] = o[3] + E | 0
				},
				_doFinalize: function () {
					var e = this._data,
						t = e.words,
						i = 8 * this._nDataBytes,
						r = 8 * e.sigBytes;
					t[r >>> 5] |= 128 << 24 - r % 32;
					var n = c.floor(i / 4294967296),
						i = i;
					t[15 + (64 + r >>> 9 << 4)] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8), t[14 + (64 + r >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (t.length + 1), this._process();
					for (var t = this._hash, o = t.words, s = 0; s < 4; s++) {
						var a = o[s];
						o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
					}
					return t
				},
				clone: function () {
					var e = r.clone.call(this);
					return e._hash = this._hash.clone(), e
				}
			});

			function R(e, t, i, r, n, o, s) {
				s = e + (t & i | ~t & r) + n + s;
				return (s << o | s >>> 32 - o) + t
			}

			function D(e, t, i, r, n, o, s) {
				s = e + (t & r | i & ~r) + n + s;
				return (s << o | s >>> 32 - o) + t
			}

			function b(e, t, i, r, n, o, s) {
				s = e + (t ^ i ^ r) + n + s;
				return (s << o | s >>> 32 - o) + t
			}

			function O(e, t, i, r, n, o, s) {
				s = e + (i ^ (t | ~r)) + n + s;
				return (s << o | s >>> 32 - o) + t
			}
			e.MD5 = r._createHelper(t), e.HmacMD5 = r._createHmacHelper(t)
		}(Math), n.MD5));
		var n
	}
	var ne, oe = {
		exports: {}
	};

	function se() {
		return ne ? oe.exports : (ne = 1, oe.exports = (n = V(), function () {
			var e = n,
				t = e.lib,
				i = t.WordArray,
				r = t.Hasher,
				t = e.algo,
				l = [],
				t = t.SHA1 = r.extend({
					_doReset: function () {
						this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
					},
					_doProcessBlock: function (e, t) {
						for (var i = this._hash.words, r = i[0], n = i[1], o = i[2], s = i[3], a = i[4], c = 0; c < 80; c++) {
							c < 16 ? l[c] = 0 | e[t + c] : (d = l[c - 3] ^ l[c - 8] ^ l[c - 14] ^ l[c - 16], l[c] = d << 1 | d >>> 31);
							var d = (r << 5 | r >>> 27) + a + l[c];
							d += c < 20 ? 1518500249 + (n & o | ~n & s) : c < 40 ? 1859775393 + (n ^ o ^ s) : c < 60 ? (n & o | n & s | o & s) - 1894007588 : (n ^ o ^ s) - 899497514, a = s, s = o, o = n << 30 | n >>> 2, n = r, r = d
						}
						i[0] = i[0] + r | 0, i[1] = i[1] + n | 0, i[2] = i[2] + o | 0, i[3] = i[3] + s | 0, i[4] = i[4] + a | 0
					},
					_doFinalize: function () {
						var e = this._data,
							t = e.words,
							i = 8 * this._nDataBytes,
							r = 8 * e.sigBytes;
						return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (64 + r >>> 9 << 4)] = Math.floor(i / 4294967296), t[15 + (64 + r >>> 9 << 4)] = i, e.sigBytes = 4 * t.length, this._process(), this._hash
					},
					clone: function () {
						var e = r.clone.call(this);
						return e._hash = this._hash.clone(), e
					}
				});
			e.SHA1 = r._createHelper(t), e.HmacSHA1 = r._createHmacHelper(t)
		}(), n.SHA1));
		var n
	}
	var ae, ce = {
		exports: {}
	};

	function de() {
		return ae ? ce.exports : (ae = 1, ce.exports = (s = V(), function (n) {
			var e = s,
				t = e.lib,
				i = t.WordArray,
				r = t.Hasher,
				t = e.algo,
				o = [],
				_ = [];
			! function () {
				function e(e) {
					return 4294967296 * (e - (0 | e)) | 0
				}
				for (var t = 2, i = 0; i < 64;) ! function (e) {
					for (var t = n.sqrt(e), i = 2; i <= t; i++)
						if (!(e % i)) return;
					return 1
				}(t) || (i < 8 && (o[i] = e(n.pow(t, .5))), _[i] = e(n.pow(t, 1 / 3)), i++), t++
			}();
			var p = [],
				t = t.SHA256 = r.extend({
					_doReset: function () {
						this._hash = new i.init(o.slice(0))
					},
					_doProcessBlock: function (e, t) {
						for (var i = this._hash.words, r = i[0], n = i[1], o = i[2], s = i[3], a = i[4], c = i[5], d = i[6], l = i[7], h = 0; h < 64; h++) {
							h < 16 ? p[h] = 0 | e[t + h] : (f = p[h - 15], u = p[h - 2], p[h] = ((f << 25 | f >>> 7) ^ (f << 14 | f >>> 18) ^ f >>> 3) + p[h - 7] + ((u << 15 | u >>> 17) ^ (u << 13 | u >>> 19) ^ u >>> 10) + p[h - 16]);
							var f = r & n ^ r & o ^ n & o,
								u = l + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & c ^ ~a & d) + _[h] + p[h],
								l = d,
								d = c,
								c = a,
								a = s + u | 0,
								s = o,
								o = n,
								n = r,
								r = u + (((r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)) + f) | 0
						}
						i[0] = i[0] + r | 0, i[1] = i[1] + n | 0, i[2] = i[2] + o | 0, i[3] = i[3] + s | 0, i[4] = i[4] + a | 0, i[5] = i[5] + c | 0, i[6] = i[6] + d | 0, i[7] = i[7] + l | 0
					},
					_doFinalize: function () {
						var e = this._data,
							t = e.words,
							i = 8 * this._nDataBytes,
							r = 8 * e.sigBytes;
						return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (64 + r >>> 9 << 4)] = n.floor(i / 4294967296), t[15 + (64 + r >>> 9 << 4)] = i, e.sigBytes = 4 * t.length, this._process(), this._hash
					},
					clone: function () {
						var e = r.clone.call(this);
						return e._hash = this._hash.clone(), e
					}
				});
			e.SHA256 = r._createHelper(t), e.HmacSHA256 = r._createHmacHelper(t)
		}(Math), s.SHA256));
		var s
	}
	var le, he = {
		exports: {}
	};

	function fe() {
		return le ? he.exports : (le = 1, he.exports = (n = V(), de(), function () {
			var e = n,
				t = e.lib.WordArray,
				i = e.algo,
				r = i.SHA256,
				i = i.SHA224 = r.extend({
					_doReset: function () {
						this._hash = new t.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
					},
					_doFinalize: function () {
						var e = r._doFinalize.call(this);
						return e.sigBytes -= 4, e
					}
				});
			e.SHA224 = r._createHelper(i), e.HmacSHA224 = r._createHmacHelper(i)
		}(), n.SHA224));
		var n
	}
	var ue, _e = {
		exports: {}
	};

	function pe() {
		return ue ? _e.exports : (ue = 1, _e.exports = (s = V(), j(), function () {
			var e = s,
				t = e.lib.Hasher,
				i = e.x64,
				r = i.Word,
				n = i.WordArray,
				i = e.algo;

			function o() {
				return r.create.apply(r, arguments)
			}
			var ee = [o(1116352408, 3609767458), o(1899447441, 602891725), o(3049323471, 3964484399), o(3921009573, 2173295548), o(961987163, 4081628472), o(1508970993, 3053834265), o(2453635748, 2937671579), o(2870763221, 3664609560), o(3624381080, 2734883394), o(310598401, 1164996542), o(607225278, 1323610764), o(1426881987, 3590304994), o(1925078388, 4068182383), o(2162078206, 991336113), o(2614888103, 633803317), o(3248222580, 3479774868), o(3835390401, 2666613458), o(4022224774, 944711139), o(264347078, 2341262773), o(604807628, 2007800933), o(770255983, 1495990901), o(1249150122, 1856431235), o(1555081692, 3175218132), o(1996064986, 2198950837), o(2554220882, 3999719339), o(2821834349, 766784016), o(2952996808, 2566594879), o(3210313671, 3203337956), o(3336571891, 1034457026), o(3584528711, 2466948901), o(113926993, 3758326383), o(338241895, 168717936), o(666307205, 1188179964), o(773529912, 1546045734), o(1294757372, 1522805485), o(1396182291, 2643833823), o(1695183700, 2343527390), o(1986661051, 1014477480), o(2177026350, 1206759142), o(2456956037, 344077627), o(2730485921, 1290863460), o(2820302411, 3158454273), o(3259730800, 3505952657), o(3345764771, 106217008), o(3516065817, 3606008344), o(3600352804, 1432725776), o(4094571909, 1467031594), o(275423344, 851169720), o(430227734, 3100823752), o(506948616, 1363258195), o(659060556, 3750685593), o(883997877, 3785050280), o(958139571, 3318307427), o(1322822218, 3812723403), o(1537002063, 2003034995), o(1747873779, 3602036899), o(1955562222, 1575990012), o(2024104815, 1125592928), o(2227730452, 2716904306), o(2361852424, 442776044), o(2428436474, 593698344), o(2756734187, 3733110249), o(3204031479, 2999351573), o(3329325298, 3815920427), o(3391569614, 3928383900), o(3515267271, 566280711), o(3940187606, 3454069534), o(4118630271, 4000239992), o(116418474, 1914138554), o(174292421, 2731055270), o(289380356, 3203993006), o(460393269, 320620315), o(685471733, 587496836), o(852142971, 1086792851), o(1017036298, 365543100), o(1126000580, 2618297676), o(1288033470, 3409855158), o(1501505948, 4234509866), o(1607167915, 987167468), o(1816402316, 1246189591)],
				te = [];
			! function () {
				for (var e = 0; e < 80; e++) te[e] = o()
			}();
			i = i.SHA512 = t.extend({
				_doReset: function () {
					this._hash = new n.init([new r.init(1779033703, 4089235720), new r.init(3144134277, 2227873595), new r.init(1013904242, 4271175723), new r.init(2773480762, 1595750129), new r.init(1359893119, 2917565137), new r.init(2600822924, 725511199), new r.init(528734635, 4215389547), new r.init(1541459225, 327033209)])
				},
				_doProcessBlock: function (e, t) {
					for (var i = this._hash.words, r = i[0], n = i[1], o = i[2], s = i[3], a = i[4], c = i[5], d = i[6], l = i[7], h = r.high, f = r.low, u = n.high, _ = n.low, p = o.high, g = o.low, m = s.high, y = s.low, v = a.high, A = a.low, w = c.high, I = c.low, E = d.high, B = d.low, x = l.high, i = l.low, S = h, R = f, D = u, b = _, O = p, T = g, k = m, N = y, L = v, P = A, C = w, H = I, F = E, M = B, z = x, G = i, V = 0; V < 80; V++) {
						var W, U, j = te[V];
						V < 16 ? (U = j.high = 0 | e[t + 2 * V], W = j.low = 0 | e[t + 2 * V + 1]) : (Q = (q = te[V - 15]).high, X = q.low, K = (J = te[V - 2]).high, $ = J.low, Y = (Z = te[V - 7]).high, q = Z.low, Z = (J = te[V - 16]).high, U = (U = ((Q >>> 1 | X << 31) ^ (Q >>> 8 | X << 24) ^ Q >>> 7) + Y + ((W = (Y = (X >>> 1 | Q << 31) ^ (X >>> 8 | Q << 24) ^ (X >>> 7 | Q << 25)) + q) >>> 0 < Y >>> 0 ? 1 : 0)) + ((K >>> 19 | $ << 13) ^ (K << 3 | $ >>> 29) ^ K >>> 6) + ((W += X = ($ >>> 19 | K << 13) ^ ($ << 3 | K >>> 29) ^ ($ >>> 6 | K << 26)) >>> 0 < X >>> 0 ? 1 : 0), W += Q = J.low, j.high = U = U + Z + (W >>> 0 < Q >>> 0 ? 1 : 0), j.low = W);
						var q = L & C ^ ~L & F,
							Y = P & H ^ ~P & M,
							$ = S & D ^ S & O ^ D & O,
							K = (R >>> 28 | S << 4) ^ (R << 30 | S >>> 2) ^ (R << 25 | S >>> 7),
							X = ee[V],
							J = X.high,
							Z = X.low,
							Q = G + ((P >>> 14 | L << 18) ^ (P >>> 18 | L << 14) ^ (P << 23 | L >>> 9)),
							j = z + ((L >>> 14 | P << 18) ^ (L >>> 18 | P << 14) ^ (L << 23 | P >>> 9)) + (Q >>> 0 < G >>> 0 ? 1 : 0),
							X = K + (R & b ^ R & T ^ b & T),
							z = F,
							G = M,
							F = C,
							M = H,
							C = L,
							H = P,
							L = k + (j = (j = (j = j + q + ((Q = Q + Y) >>> 0 < Y >>> 0 ? 1 : 0)) + J + ((Q = Q + Z) >>> 0 < Z >>> 0 ? 1 : 0)) + U + ((Q = Q + W) >>> 0 < W >>> 0 ? 1 : 0)) + ((P = N + Q | 0) >>> 0 < N >>> 0 ? 1 : 0) | 0,
							k = O,
							N = T,
							O = D,
							T = b,
							D = S,
							b = R,
							S = j + (((S >>> 28 | R << 4) ^ (S << 30 | R >>> 2) ^ (S << 25 | R >>> 7)) + $ + (X >>> 0 < K >>> 0 ? 1 : 0)) + ((R = Q + X | 0) >>> 0 < Q >>> 0 ? 1 : 0) | 0
					}
					f = r.low = f + R, r.high = h + S + (f >>> 0 < R >>> 0 ? 1 : 0), _ = n.low = _ + b, n.high = u + D + (_ >>> 0 < b >>> 0 ? 1 : 0), g = o.low = g + T, o.high = p + O + (g >>> 0 < T >>> 0 ? 1 : 0), y = s.low = y + N, s.high = m + k + (y >>> 0 < N >>> 0 ? 1 : 0), A = a.low = A + P, a.high = v + L + (A >>> 0 < P >>> 0 ? 1 : 0), I = c.low = I + H, c.high = w + C + (I >>> 0 < H >>> 0 ? 1 : 0), B = d.low = B + M, d.high = E + F + (B >>> 0 < M >>> 0 ? 1 : 0), i = l.low = i + G, l.high = x + z + (i >>> 0 < G >>> 0 ? 1 : 0)
				},
				_doFinalize: function () {
					var e = this._data,
						t = e.words,
						i = 8 * this._nDataBytes,
						r = 8 * e.sigBytes;
					return t[r >>> 5] |= 128 << 24 - r % 32, t[30 + (128 + r >>> 10 << 5)] = Math.floor(i / 4294967296), t[31 + (128 + r >>> 10 << 5)] = i, e.sigBytes = 4 * t.length, this._process(), this._hash.toX32()
				},
				clone: function () {
					var e = t.clone.call(this);
					return e._hash = this._hash.clone(), e
				},
				blockSize: 32
			});
			e.SHA512 = t._createHelper(i), e.HmacSHA512 = t._createHmacHelper(i)
		}(), s.SHA512));
		var s
	}
	var ge, me = {
		exports: {}
	};

	function ye() {
		return ge ? me.exports : (ge = 1, me.exports = (o = V(), j(), pe(), function () {
			var e = o,
				t = e.x64,
				i = t.Word,
				r = t.WordArray,
				t = e.algo,
				n = t.SHA512,
				t = t.SHA384 = n.extend({
					_doReset: function () {
						this._hash = new r.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)])
					},
					_doFinalize: function () {
						var e = n._doFinalize.call(this);
						return e.sigBytes -= 16, e
					}
				});
			e.SHA384 = n._createHelper(t), e.HmacSHA384 = n._createHmacHelper(t)
		}(), o.SHA384));
		var o
	}
	var ve, Ae = {
		exports: {}
	};

	function we() {
		return ve ? Ae.exports : (ve = 1, Ae.exports = (i = V(), j(), function (l) {
			var e = i,
				t = e.lib,
				h = t.WordArray,
				r = t.Hasher,
				f = e.x64.Word,
				t = e.algo,
				S = [],
				R = [],
				D = [];
			! function () {
				for (var e = 1, t = 0, i = 0; i < 24; i++) {
					S[e + 5 * t] = (i + 1) * (i + 2) / 2 % 64;
					var r = (2 * e + 3 * t) % 5;
					e = t % 5, t = r
				}
				for (e = 0; e < 5; e++)
					for (t = 0; t < 5; t++) R[e + 5 * t] = t + (2 * e + 3 * t) % 5 * 5;
				for (var n = 1, o = 0; o < 24; o++) {
					for (var s, a = 0, c = 0, d = 0; d < 7; d++) 1 & n && ((s = (1 << d) - 1) < 32 ? c ^= 1 << s : a ^= 1 << s - 32), 128 & n ? n = n << 1 ^ 113 : n <<= 1;
					D[o] = f.create(a, c)
				}
			}();
			var b = [];
			! function () {
				for (var e = 0; e < 25; e++) b[e] = f.create()
			}();
			t = t.SHA3 = r.extend({
				cfg: r.cfg.extend({
					outputLength: 512
				}),
				_doReset: function () {
					for (var e = this._state = [], t = 0; t < 25; t++) e[t] = new f.init;
					this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
				},
				_doProcessBlock: function (e, t) {
					for (var i = this._state, r = this.blockSize / 2, n = 0; n < r; n++) {
						var o = e[t + 2 * n],
							s = e[t + 2 * n + 1],
							o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
						(I = i[n]).high ^= s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), I.low ^= o
					}
					for (var a = 0; a < 24; a++) {
						for (var c = 0; c < 5; c++) {
							for (var d = 0, l = 0, h = 0; h < 5; h++) d ^= (I = i[c + 5 * h]).high, l ^= I.low;
							var f = b[c];
							f.high = d, f.low = l
						}
						for (c = 0; c < 5; c++)
							for (var u = b[(c + 4) % 5], _ = b[(c + 1) % 5], p = _.high, _ = _.low, d = u.high ^ (p << 1 | _ >>> 31), l = u.low ^ (_ << 1 | p >>> 31), h = 0; h < 5; h++)(I = i[c + 5 * h]).high ^= d, I.low ^= l;
						for (var g = 1; g < 25; g++) {
							var m = (I = i[g]).high,
								y = I.low,
								v = S[g];
							l = v < 32 ? (d = m << v | y >>> 32 - v, y << v | m >>> 32 - v) : (d = y << v - 32 | m >>> 64 - v, m << v - 32 | y >>> 64 - v);
							v = b[R[g]];
							v.high = d, v.low = l
						}
						var A = b[0],
							w = i[0];
						A.high = w.high, A.low = w.low;
						for (c = 0; c < 5; c++)
							for (h = 0; h < 5; h++) {
								var I = i[g = c + 5 * h],
									E = b[g],
									B = b[(c + 1) % 5 + 5 * h],
									x = b[(c + 2) % 5 + 5 * h];
								I.high = E.high ^ ~B.high & x.high, I.low = E.low ^ ~B.low & x.low
							}
						I = i[0], w = D[a];
						I.high ^= w.high, I.low ^= w.low
					}
				},
				_doFinalize: function () {
					var e = this._data,
						t = e.words;
					this._nDataBytes;
					var i = 8 * e.sigBytes,
						r = 32 * this.blockSize;
					t[i >>> 5] |= 1 << 24 - i % 32, t[(l.ceil((1 + i) / r) * r >>> 5) - 1] |= 128, e.sigBytes = 4 * t.length, this._process();
					for (var n = this._state, t = this.cfg.outputLength / 8, o = t / 8, s = [], a = 0; a < o; a++) {
						var c = n[a],
							d = c.high,
							c = c.low,
							d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8);
						s.push(c = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)), s.push(d)
					}
					return new h.init(s, t)
				},
				clone: function () {
					for (var e = r.clone.call(this), t = e._state = this._state.slice(0), i = 0; i < 25; i++) t[i] = t[i].clone();
					return e
				}
			});
			e.SHA3 = r._createHelper(t), e.HmacSHA3 = r._createHmacHelper(t)
		}(Math), i.SHA3));
		var i
	}
	var Ie, Ee = {
		exports: {}
	};

	function Be() {
		return Ie ? Ee.exports : (Ie = 1, Ee.exports = (n = V(), function () {
			var e = n,
				t = e.lib,
				i = t.WordArray,
				r = t.Hasher,
				t = e.algo,
				E = i.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
				B = i.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
				x = i.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
				S = i.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
				R = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
				D = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
				t = t.RIPEMD160 = r.extend({
					_doReset: function () {
						this._hash = i.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
					},
					_doProcessBlock: function (e, t) {
						for (var i = 0; i < 16; i++) {
							var r = t + i,
								n = e[r];
							e[r] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8)
						}
						for (var o, s, a, c, d, l, h = this._hash.words, f = R.words, u = D.words, _ = E.words, p = B.words, g = x.words, m = S.words, y = o = h[0], v = s = h[1], A = a = h[2], w = c = h[3], I = d = h[4], i = 0; i < 80; i += 1) l = o + e[t + _[i]] | 0, l += i < 16 ? (s ^ a ^ c) + f[0] : i < 32 ? b(s, a, c) + f[1] : i < 48 ? ((s | ~a) ^ c) + f[2] : i < 64 ? O(s, a, c) + f[3] : (s ^ (a | ~c)) + f[4], l = (l = T(l |= 0, g[i])) + d | 0, o = d, d = c, c = T(a, 10), a = s, s = l, l = y + e[t + p[i]] | 0, l += i < 16 ? (v ^ (A | ~w)) + u[0] : i < 32 ? O(v, A, w) + u[1] : i < 48 ? ((v | ~A) ^ w) + u[2] : i < 64 ? b(v, A, w) + u[3] : (v ^ A ^ w) + u[4], l = (l = T(l |= 0, m[i])) + I | 0, y = I, I = w, w = T(A, 10), A = v, v = l;
						l = h[1] + a + w | 0, h[1] = h[2] + c + I | 0, h[2] = h[3] + d + y | 0, h[3] = h[4] + o + v | 0, h[4] = h[0] + s + A | 0, h[0] = l
					},
					_doFinalize: function () {
						var e = this._data,
							t = e.words,
							i = 8 * this._nDataBytes,
							r = 8 * e.sigBytes;
						t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (64 + r >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (t.length + 1), this._process();
						for (var t = this._hash, n = t.words, o = 0; o < 5; o++) {
							var s = n[o];
							n[o] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
						}
						return t
					},
					clone: function () {
						var e = r.clone.call(this);
						return e._hash = this._hash.clone(), e
					}
				});

			function b(e, t, i) {
				return e & t | ~e & i
			}

			function O(e, t, i) {
				return e & i | t & ~i
			}

			function T(e, t) {
				return e << t | e >>> 32 - t
			}
			e.RIPEMD160 = r._createHelper(t), e.HmacRIPEMD160 = r._createHmacHelper(t)
		}(), n.RIPEMD160));
		var n
	}
	var xe, Se = {
		exports: {}
	};

	function Re() {
		return xe ? Se.exports : (xe = 1, Se.exports = (t = V(), void
			function () {
				var e = t.lib.Base,
					a = t.enc.Utf8;
				t.algo.HMAC = e.extend({
					init: function (e, t) {
						e = this._hasher = new e.init, "string" == typeof t && (t = a.parse(t));
						var i = e.blockSize,
							r = 4 * i;
						(t = t.sigBytes > r ? e.finalize(t) : t).clamp();
						for (var e = this._oKey = t.clone(), t = this._iKey = t.clone(), n = e.words, o = t.words, s = 0; s < i; s++) n[s] ^= 1549556828, o[s] ^= 909522486;
						e.sigBytes = t.sigBytes = r, this.reset()
					},
					reset: function () {
						var e = this._hasher;
						e.reset(), e.update(this._iKey)
					},
					update: function (e) {
						return this._hasher.update(e), this
					},
					finalize: function (e) {
						var t = this._hasher,
							e = t.finalize(e);
						return t.reset(), t.finalize(this._oKey.clone().concat(e))
					}
				})
			}()));
		var t
	}
	var De, be = {
		exports: {}
	};

	function Oe() {
		return De ? be.exports : (De = 1, be.exports = (o = V(), se(), Re(), function () {
			var e = o,
				t = e.lib,
				i = t.Base,
				m = t.WordArray,
				r = e.algo,
				t = r.SHA1,
				y = r.HMAC,
				n = r.PBKDF2 = i.extend({
					cfg: i.extend({
						keySize: 4,
						hasher: t,
						iterations: 1
					}),
					init: function (e) {
						this.cfg = this.cfg.extend(e)
					},
					compute: function (e, t) {
						for (var i = this.cfg, r = y.create(i.hasher, e), n = m.create(), o = m.create([1]), s = n.words, a = o.words, c = i.keySize, d = i.iterations; s.length < c;) {
							var l = r.update(t).finalize(o);
							r.reset();
							for (var h = l.words, f = h.length, u = l, _ = 1; _ < d; _++) {
								u = r.finalize(u), r.reset();
								for (var p = u.words, g = 0; g < f; g++) h[g] ^= p[g]
							}
							n.concat(l), a[0]++
						}
						return n.sigBytes = 4 * c, n
					}
				});
			e.PBKDF2 = function (e, t, i) {
				return n.create(i).compute(e, t)
			}
		}(), o.PBKDF2));
		var o
	}
	var Te, ke = {
		exports: {}
	};

	function Ne() {
		return Te ? ke.exports : (Te = 1, ke.exports = (o = V(), se(), Re(), function () {
			var e = o,
				t = e.lib,
				i = t.Base,
				l = t.WordArray,
				r = e.algo,
				t = r.MD5,
				n = r.EvpKDF = i.extend({
					cfg: i.extend({
						keySize: 4,
						hasher: t,
						iterations: 1
					}),
					init: function (e) {
						this.cfg = this.cfg.extend(e)
					},
					compute: function (e, t) {
						for (var i, r = this.cfg, n = r.hasher.create(), o = l.create(), s = o.words, a = r.keySize, c = r.iterations; s.length < a;) {
							i && n.update(i), i = n.update(e).finalize(t), n.reset();
							for (var d = 1; d < c; d++) i = n.finalize(i), n.reset();
							o.concat(i)
						}
						return o.sigBytes = 4 * a, o
					}
				});
			e.EvpKDF = function (e, t, i) {
				return n.create(i).compute(e, t)
			}
		}(), o.EvpKDF));
		var o
	}
	var Le, Pe = {
		exports: {}
	};

	function Ce() {
		return Le ? Pe.exports : (Le = 1, Pe.exports = (g = V(), Ne(), void (g.lib.Cipher || function (s) {
			var e = g,
				t = e.lib,
				i = t.Base,
				a = t.WordArray,
				r = t.BufferedBlockAlgorithm,
				n = e.enc;
			n.Utf8;
			var o = n.Base64,
				c = e.algo.EvpKDF,
				d = t.Cipher = r.extend({
					cfg: i.extend(),
					createEncryptor: function (e, t) {
						return this.create(this._ENC_XFORM_MODE, e, t)
					},
					createDecryptor: function (e, t) {
						return this.create(this._DEC_XFORM_MODE, e, t)
					},
					init: function (e, t, i) {
						this.cfg = this.cfg.extend(i), this._xformMode = e, this._key = t, this.reset()
					},
					reset: function () {
						r.reset.call(this), this._doReset()
					},
					process: function (e) {
						return this._append(e), this._process()
					},
					finalize: function (e) {
						return e && this._append(e), this._doFinalize()
					},
					keySize: 4,
					ivSize: 4,
					_ENC_XFORM_MODE: 1,
					_DEC_XFORM_MODE: 2,
					_createHelper: function (r) {
						return {
							encrypt: function (e, t, i) {
								return l(t).encrypt(r, e, t, i)
							},
							decrypt: function (e, t, i) {
								return l(t).decrypt(r, e, t, i)
							}
						}
					}
				});

			function l(e) {
				return "string" == typeof e ? p : _
			}
			t.StreamCipher = d.extend({
				_doFinalize: function () {
					return this._process(!0)
				},
				blockSize: 1
			});
			var h = e.mode = {},
				n = t.BlockCipherMode = i.extend({
					createEncryptor: function (e, t) {
						return this.Encryptor.create(e, t)
					},
					createDecryptor: function (e, t) {
						return this.Decryptor.create(e, t)
					},
					init: function (e, t) {
						this._cipher = e, this._iv = t
					}
				}),
				n = h.CBC = ((h = n.extend()).Encryptor = h.extend({
					processBlock: function (e, t) {
						var i = this._cipher,
							r = i.blockSize;
						f.call(this, e, t, r), i.encryptBlock(e, t), this._prevBlock = e.slice(t, t + r)
					}
				}), h.Decryptor = h.extend({
					processBlock: function (e, t) {
						var i = this._cipher,
							r = i.blockSize,
							n = e.slice(t, t + r);
						i.decryptBlock(e, t), f.call(this, e, t, r), this._prevBlock = n
					}
				}), h);

			function f(e, t, i) {
				var r, n = this._iv;
				n ? (r = n, this._iv = s) : r = this._prevBlock;
				for (var o = 0; o < i; o++) e[t + o] ^= r[o]
			}
			h = (e.pad = {}).Pkcs7 = {
				pad: function (e, t) {
					for (var t = 4 * t, i = t - e.sigBytes % t, r = i << 24 | i << 16 | i << 8 | i, n = [], o = 0; o < i; o += 4) n.push(r);
					t = a.create(n, i);
					e.concat(t)
				},
				unpad: function (e) {
					var t = 255 & e.words[e.sigBytes - 1 >>> 2];
					e.sigBytes -= t
				}
			};
			t.BlockCipher = d.extend({
				cfg: d.cfg.extend({
					mode: n,
					padding: h
				}),
				reset: function () {
					var e;
					d.reset.call(this);
					var t = this.cfg,
						i = t.iv,
						t = t.mode;
					this._xformMode == this._ENC_XFORM_MODE ? e = t.createEncryptor : (e = t.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e ? this._mode.init(this, i && i.words) : (this._mode = e.call(t, this, i && i.words), this._mode.__creator = e)
				},
				_doProcessBlock: function (e, t) {
					this._mode.processBlock(e, t)
				},
				_doFinalize: function () {
					var e, t = this.cfg.padding;
					return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize), e = this._process(!0)) : (e = this._process(!0), t.unpad(e)), e
				},
				blockSize: 4
			});
			var u = t.CipherParams = i.extend({
				init: function (e) {
					this.mixIn(e)
				},
				toString: function (e) {
					return (e || this.formatter).stringify(this)
				}
			}),
				h = (e.format = {}).OpenSSL = {
					stringify: function (e) {
						var t = e.ciphertext,
							e = e.salt,
							t = e ? a.create([1398893684, 1701076831]).concat(e).concat(t) : t;
						return t.toString(o)
					},
					parse: function (e) {
						var t, i = o.parse(e),
							e = i.words;
						return 1398893684 == e[0] && 1701076831 == e[1] && (t = a.create(e.slice(2, 4)), e.splice(0, 4), i.sigBytes -= 16), u.create({
							ciphertext: i,
							salt: t
						})
					}
				},
				_ = t.SerializableCipher = i.extend({
					cfg: i.extend({
						format: h
					}),
					encrypt: function (e, t, i, r) {
						r = this.cfg.extend(r);
						var n = e.createEncryptor(i, r),
							t = n.finalize(t),
							n = n.cfg;
						return u.create({
							ciphertext: t,
							key: i,
							iv: n.iv,
							algorithm: e,
							mode: n.mode,
							padding: n.padding,
							blockSize: e.blockSize,
							formatter: r.format
						})
					},
					decrypt: function (e, t, i, r) {
						return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(i, r).finalize(t.ciphertext)
					},
					_parse: function (e, t) {
						return "string" == typeof e ? t.parse(e, this) : e
					}
				}),
				e = (e.kdf = {}).OpenSSL = {
					execute: function (e, t, i, r) {
						r = r || a.random(8);
						e = c.create({
							keySize: t + i
						}).compute(e, r), i = a.create(e.words.slice(t), 4 * i);
						return e.sigBytes = 4 * t, u.create({
							key: e,
							iv: i,
							salt: r
						})
					}
				},
				p = t.PasswordBasedCipher = _.extend({
					cfg: _.cfg.extend({
						kdf: e
					}),
					encrypt: function (e, t, i, r) {
						i = (r = this.cfg.extend(r)).kdf.execute(i, e.keySize, e.ivSize);
						r.iv = i.iv;
						r = _.encrypt.call(this, e, t, i.key, r);
						return r.mixIn(i), r
					},
					decrypt: function (e, t, i, r) {
						r = this.cfg.extend(r), t = this._parse(t, r.format);
						i = r.kdf.execute(i, e.keySize, e.ivSize, t.salt);
						return r.iv = i.iv, _.decrypt.call(this, e, t, i.key, r)
					}
				})
		}())));
		var g
	}
	var He, Fe = {
		exports: {}
	};

	function Me() {
		return He ? Fe.exports : (He = 1, Fe.exports = (t = V(), Ce(), t.mode.CFB = function () {
			var e = t.lib.BlockCipherMode.extend();

			function o(e, t, i, r) {
				var n, o = this._iv;
				o ? (n = o.slice(0), this._iv = void 0) : n = this._prevBlock, r.encryptBlock(n, 0);
				for (var s = 0; s < i; s++) e[t + s] ^= n[s]
			}
			return e.Encryptor = e.extend({
				processBlock: function (e, t) {
					var i = this._cipher,
						r = i.blockSize;
					o.call(this, e, t, r, i), this._prevBlock = e.slice(t, t + r)
				}
			}), e.Decryptor = e.extend({
				processBlock: function (e, t) {
					var i = this._cipher,
						r = i.blockSize,
						n = e.slice(t, t + r);
					o.call(this, e, t, r, i), this._prevBlock = n
				}
			}), e
		}(), t.mode.CFB));
		var t
	}
	var ze, Ge = {
		exports: {}
	};

	function Ve() {
		return ze ? Ge.exports : (ze = 1, Ge.exports = (i = V(), Ce(), i.mode.CTR = function () {
			var e = i.lib.BlockCipherMode.extend(),
				t = e.Encryptor = e.extend({
					processBlock: function (e, t) {
						var i = this._cipher,
							r = i.blockSize,
							n = this._iv,
							o = this._counter;
						n && (o = this._counter = n.slice(0), this._iv = void 0);
						var s = o.slice(0);
						i.encryptBlock(s, 0), o[r - 1] = o[r - 1] + 1 | 0;
						for (var a = 0; a < r; a++) e[t + a] ^= s[a]
					}
				});
			return e.Decryptor = t, e
		}(), i.mode.CTR));
		var i
	}
	var We, Ue = {
		exports: {}
	};

	function je() {
		return We ? Ue.exports : (We = 1, Ue.exports = (i = V(), Ce(), i.mode.CTRGladman = function () {
			var e = i.lib.BlockCipherMode.extend();

			function c(e) {
				var t, i, r;
				return 255 == (e >> 24 & 255) ? (i = e >> 8 & 255, r = 255 & e, 255 === (t = e >> 16 & 255) ? (t = 0, 255 === i ? (i = 0, 255 === r ? r = 0 : ++r) : ++i) : ++t, e = 0, e += t << 16, e += i << 8, e += r) : e += 1 << 24, e
			}
			var t = e.Encryptor = e.extend({
				processBlock: function (e, t) {
					var i = this._cipher,
						r = i.blockSize,
						n = this._iv,
						o = this._counter;
					n && (o = this._counter = n.slice(0), this._iv = void 0), 0 === ((n = o)[0] = c(n[0])) && (n[1] = c(n[1]));
					var s = o.slice(0);
					i.encryptBlock(s, 0);
					for (var a = 0; a < r; a++) e[t + a] ^= s[a]
				}
			});
			return e.Decryptor = t, e
		}(), i.mode.CTRGladman));
		var i
	}
	var qe, Ye = {
		exports: {}
	};

	function $e() {
		return qe ? Ye.exports : (qe = 1, Ye.exports = (i = V(), Ce(), i.mode.OFB = function () {
			var e = i.lib.BlockCipherMode.extend(),
				t = e.Encryptor = e.extend({
					processBlock: function (e, t) {
						var i = this._cipher,
							r = i.blockSize,
							n = this._iv,
							o = this._keystream;
						n && (o = this._keystream = n.slice(0), this._iv = void 0), i.encryptBlock(o, 0);
						for (var s = 0; s < r; s++) e[t + s] ^= o[s]
					}
				});
			return e.Decryptor = t, e
		}(), i.mode.OFB));
		var i
	}
	var Ke;
	var Xe;
	var Je;
	var Ze;
	var Qe;
	var et;
	var tt, it = {
		exports: {}
	};

	function rt() {
		return tt ? it.exports : (tt = 1, it.exports = (e = V(), Ce(), function () {
			var t = e.lib.CipherParams,
				i = e.enc.Hex;
			e.format.Hex = {
				stringify: function (e) {
					return e.ciphertext.toString(i)
				},
				parse: function (e) {
					e = i.parse(e);
					return t.create({
						ciphertext: e
					})
				}
			}
		}(), e.format.Hex));
		var e
	}
	var nt, ot = {
		exports: {}
	};

	function st() {
		return nt ? ot.exports : (nt = 1, ot.exports = (r = V(), ee(), re(), Ne(), Ce(), function () {
			var e = r,
				t = e.lib.BlockCipher,
				i = e.algo,
				d = [],
				l = [],
				h = [],
				f = [],
				u = [],
				_ = [],
				p = [],
				g = [],
				m = [],
				y = [];
			! function () {
				for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
				for (var i = 0, r = 0, t = 0; t < 256; t++) {
					var n = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
					d[i] = n = n >>> 8 ^ 255 & n ^ 99;
					var o = e[l[n] = i],
						s = e[o],
						a = e[s],
						c = 257 * e[n] ^ 16843008 * n;
					h[i] = c << 24 | c >>> 8, f[i] = c << 16 | c >>> 16, u[i] = c << 8 | c >>> 24, _[i] = c, p[n] = (c = 16843009 * a ^ 65537 * s ^ 257 * o ^ 16843008 * i) << 24 | c >>> 8, g[n] = c << 16 | c >>> 16, m[n] = c << 8 | c >>> 24, y[n] = c, i ? (i = o ^ e[e[e[a ^ o]]], r ^= e[e[r]]) : i = r = 1
				}
			}();
			var v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
				i = i.AES = t.extend({
					_doReset: function () {
						if (!this._nRounds || this._keyPriorReset !== this._key) {
							for (var e = this._keyPriorReset = this._key, t = e.words, i = e.sigBytes / 4, r = 4 * (1 + (this._nRounds = 6 + i)), n = this._keySchedule = [], o = 0; o < r; o++) o < i ? n[o] = t[o] : (c = n[o - 1], o % i ? 6 < i && o % i == 4 && (c = d[c >>> 24] << 24 | d[c >>> 16 & 255] << 16 | d[c >>> 8 & 255] << 8 | d[255 & c]) : (c = d[(c = c << 8 | c >>> 24) >>> 24] << 24 | d[c >>> 16 & 255] << 16 | d[c >>> 8 & 255] << 8 | d[255 & c], c ^= v[o / i | 0] << 24), n[o] = n[o - i] ^ c);
							for (var s = this._invKeySchedule = [], a = 0; a < r; a++) {
								var c, o = r - a;
								c = a % 4 ? n[o] : n[o - 4], s[a] = a < 4 || o <= 4 ? c : p[d[c >>> 24]] ^ g[d[c >>> 16 & 255]] ^ m[d[c >>> 8 & 255]] ^ y[d[255 & c]]
							}
						}
					},
					encryptBlock: function (e, t) {
						this._doCryptBlock(e, t, this._keySchedule, h, f, u, _, d)
					},
					decryptBlock: function (e, t) {
						var i = e[t + 1];
						e[t + 1] = e[t + 3], e[t + 3] = i, this._doCryptBlock(e, t, this._invKeySchedule, p, g, m, y, l);
						i = e[t + 1];
						e[t + 1] = e[t + 3], e[t + 3] = i
					},
					_doCryptBlock: function (e, t, i, r, n, o, s, a) {
						for (var c = this._nRounds, d = e[t] ^ i[0], l = e[t + 1] ^ i[1], h = e[t + 2] ^ i[2], f = e[t + 3] ^ i[3], u = 4, _ = 1; _ < c; _++) var p = r[d >>> 24] ^ n[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & f] ^ i[u++],
							g = r[l >>> 24] ^ n[h >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & d] ^ i[u++],
							m = r[h >>> 24] ^ n[f >>> 16 & 255] ^ o[d >>> 8 & 255] ^ s[255 & l] ^ i[u++],
							y = r[f >>> 24] ^ n[d >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & h] ^ i[u++],
							d = p,
							l = g,
							h = m,
							f = y;
						p = (a[d >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & f]) ^ i[u++], g = (a[l >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & d]) ^ i[u++], m = (a[h >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[d >>> 8 & 255] << 8 | a[255 & l]) ^ i[u++], y = (a[f >>> 24] << 24 | a[d >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & h]) ^ i[u++];
						e[t] = p, e[t + 1] = g, e[t + 2] = m, e[t + 3] = y
					},
					keySize: 8
				});
			e.AES = t._createHelper(i)
		}(), r.AES));
		var r
	}
	var at, ct = {
		exports: {}
	};

	function dt() {
		return at ? ct.exports : (at = 1, ct.exports = (o = V(), ee(), re(), Ne(), Ce(), function () {
			var e = o,
				t = e.lib,
				r = t.WordArray,
				i = t.BlockCipher,
				t = e.algo,
				d = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
				l = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
				h = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
				f = [{
					0: 8421888,
					268435456: 32768,
					536870912: 8421378,
					805306368: 2,
					1073741824: 512,
					1342177280: 8421890,
					1610612736: 8389122,
					1879048192: 8388608,
					2147483648: 514,
					2415919104: 8389120,
					2684354560: 33280,
					2952790016: 8421376,
					3221225472: 32770,
					3489660928: 8388610,
					3758096384: 0,
					4026531840: 33282,
					134217728: 0,
					402653184: 8421890,
					671088640: 33282,
					939524096: 32768,
					1207959552: 8421888,
					1476395008: 512,
					1744830464: 8421378,
					2013265920: 2,
					2281701376: 8389120,
					2550136832: 33280,
					2818572288: 8421376,
					3087007744: 8389122,
					3355443200: 8388610,
					3623878656: 32770,
					3892314112: 514,
					4160749568: 8388608,
					1: 32768,
					268435457: 2,
					536870913: 8421888,
					805306369: 8388608,
					1073741825: 8421378,
					1342177281: 33280,
					1610612737: 512,
					1879048193: 8389122,
					2147483649: 8421890,
					2415919105: 8421376,
					2684354561: 8388610,
					2952790017: 33282,
					3221225473: 514,
					3489660929: 8389120,
					3758096385: 32770,
					4026531841: 0,
					134217729: 8421890,
					402653185: 8421376,
					671088641: 8388608,
					939524097: 512,
					1207959553: 32768,
					1476395009: 8388610,
					1744830465: 2,
					2013265921: 33282,
					2281701377: 32770,
					2550136833: 8389122,
					2818572289: 514,
					3087007745: 8421888,
					3355443201: 8389120,
					3623878657: 0,
					3892314113: 33280,
					4160749569: 8421378
				}, {
					0: 1074282512,
					16777216: 16384,
					33554432: 524288,
					50331648: 1074266128,
					67108864: 1073741840,
					83886080: 1074282496,
					100663296: 1073758208,
					117440512: 16,
					134217728: 540672,
					150994944: 1073758224,
					167772160: 1073741824,
					184549376: 540688,
					201326592: 524304,
					218103808: 0,
					234881024: 16400,
					251658240: 1074266112,
					8388608: 1073758208,
					25165824: 540688,
					41943040: 16,
					58720256: 1073758224,
					75497472: 1074282512,
					92274688: 1073741824,
					109051904: 524288,
					125829120: 1074266128,
					142606336: 524304,
					159383552: 0,
					176160768: 16384,
					192937984: 1074266112,
					209715200: 1073741840,
					226492416: 540672,
					243269632: 1074282496,
					260046848: 16400,
					268435456: 0,
					285212672: 1074266128,
					301989888: 1073758224,
					318767104: 1074282496,
					335544320: 1074266112,
					352321536: 16,
					369098752: 540688,
					385875968: 16384,
					402653184: 16400,
					419430400: 524288,
					436207616: 524304,
					452984832: 1073741840,
					469762048: 540672,
					486539264: 1073758208,
					503316480: 1073741824,
					520093696: 1074282512,
					276824064: 540688,
					293601280: 524288,
					310378496: 1074266112,
					327155712: 16384,
					343932928: 1073758208,
					360710144: 1074282512,
					377487360: 16,
					394264576: 1073741824,
					411041792: 1074282496,
					427819008: 1073741840,
					444596224: 1073758224,
					461373440: 524304,
					478150656: 0,
					494927872: 16400,
					511705088: 1074266128,
					528482304: 540672
				}, {
					0: 260,
					1048576: 0,
					2097152: 67109120,
					3145728: 65796,
					4194304: 65540,
					5242880: 67108868,
					6291456: 67174660,
					7340032: 67174400,
					8388608: 67108864,
					9437184: 67174656,
					10485760: 65792,
					11534336: 67174404,
					12582912: 67109124,
					13631488: 65536,
					14680064: 4,
					15728640: 256,
					524288: 67174656,
					1572864: 67174404,
					2621440: 0,
					3670016: 67109120,
					4718592: 67108868,
					5767168: 65536,
					6815744: 65540,
					7864320: 260,
					8912896: 4,
					9961472: 256,
					11010048: 67174400,
					12058624: 65796,
					13107200: 65792,
					14155776: 67109124,
					15204352: 67174660,
					16252928: 67108864,
					16777216: 67174656,
					17825792: 65540,
					18874368: 65536,
					19922944: 67109120,
					20971520: 256,
					22020096: 67174660,
					23068672: 67108868,
					24117248: 0,
					25165824: 67109124,
					26214400: 67108864,
					27262976: 4,
					28311552: 65792,
					29360128: 67174400,
					30408704: 260,
					31457280: 65796,
					32505856: 67174404,
					17301504: 67108864,
					18350080: 260,
					19398656: 67174656,
					20447232: 0,
					21495808: 65540,
					22544384: 67109120,
					23592960: 256,
					24641536: 67174404,
					25690112: 65536,
					26738688: 67174660,
					27787264: 65796,
					28835840: 67108868,
					29884416: 67109124,
					30932992: 67174400,
					31981568: 4,
					33030144: 65792
				}, {
					0: 2151682048,
					65536: 2147487808,
					131072: 4198464,
					196608: 2151677952,
					262144: 0,
					327680: 4198400,
					393216: 2147483712,
					458752: 4194368,
					524288: 2147483648,
					589824: 4194304,
					655360: 64,
					720896: 2147487744,
					786432: 2151678016,
					851968: 4160,
					917504: 4096,
					983040: 2151682112,
					32768: 2147487808,
					98304: 64,
					163840: 2151678016,
					229376: 2147487744,
					294912: 4198400,
					360448: 2151682112,
					425984: 0,
					491520: 2151677952,
					557056: 4096,
					622592: 2151682048,
					688128: 4194304,
					753664: 4160,
					819200: 2147483648,
					884736: 4194368,
					950272: 4198464,
					1015808: 2147483712,
					1048576: 4194368,
					1114112: 4198400,
					1179648: 2147483712,
					1245184: 0,
					1310720: 4160,
					1376256: 2151678016,
					1441792: 2151682048,
					1507328: 2147487808,
					1572864: 2151682112,
					1638400: 2147483648,
					1703936: 2151677952,
					1769472: 4198464,
					1835008: 2147487744,
					1900544: 4194304,
					1966080: 64,
					2031616: 4096,
					1081344: 2151677952,
					1146880: 2151682112,
					1212416: 0,
					1277952: 4198400,
					1343488: 4194368,
					1409024: 2147483648,
					1474560: 2147487808,
					1540096: 64,
					1605632: 2147483712,
					1671168: 4096,
					1736704: 2147487744,
					1802240: 2151678016,
					1867776: 4160,
					1933312: 2151682048,
					1998848: 4194304,
					2064384: 4198464
				}, {
					0: 128,
					4096: 17039360,
					8192: 262144,
					12288: 536870912,
					16384: 537133184,
					20480: 16777344,
					24576: 553648256,
					28672: 262272,
					32768: 16777216,
					36864: 537133056,
					40960: 536871040,
					45056: 553910400,
					49152: 553910272,
					53248: 0,
					57344: 17039488,
					61440: 553648128,
					2048: 17039488,
					6144: 553648256,
					10240: 128,
					14336: 17039360,
					18432: 262144,
					22528: 537133184,
					26624: 553910272,
					30720: 536870912,
					34816: 537133056,
					38912: 0,
					43008: 553910400,
					47104: 16777344,
					51200: 536871040,
					55296: 553648128,
					59392: 16777216,
					63488: 262272,
					65536: 262144,
					69632: 128,
					73728: 536870912,
					77824: 553648256,
					81920: 16777344,
					86016: 553910272,
					90112: 537133184,
					94208: 16777216,
					98304: 553910400,
					102400: 553648128,
					106496: 17039360,
					110592: 537133056,
					114688: 262272,
					118784: 536871040,
					122880: 0,
					126976: 17039488,
					67584: 553648256,
					71680: 16777216,
					75776: 17039360,
					79872: 537133184,
					83968: 536870912,
					88064: 17039488,
					92160: 128,
					96256: 553910272,
					100352: 262272,
					104448: 553910400,
					108544: 0,
					112640: 553648128,
					116736: 16777344,
					120832: 262144,
					124928: 537133056,
					129024: 536871040
				}, {
					0: 268435464,
					256: 8192,
					512: 270532608,
					768: 270540808,
					1024: 268443648,
					1280: 2097152,
					1536: 2097160,
					1792: 268435456,
					2048: 0,
					2304: 268443656,
					2560: 2105344,
					2816: 8,
					3072: 270532616,
					3328: 2105352,
					3584: 8200,
					3840: 270540800,
					128: 270532608,
					384: 270540808,
					640: 8,
					896: 2097152,
					1152: 2105352,
					1408: 268435464,
					1664: 268443648,
					1920: 8200,
					2176: 2097160,
					2432: 8192,
					2688: 268443656,
					2944: 270532616,
					3200: 0,
					3456: 270540800,
					3712: 2105344,
					3968: 268435456,
					4096: 268443648,
					4352: 270532616,
					4608: 270540808,
					4864: 8200,
					5120: 2097152,
					5376: 268435456,
					5632: 268435464,
					5888: 2105344,
					6144: 2105352,
					6400: 0,
					6656: 8,
					6912: 270532608,
					7168: 8192,
					7424: 268443656,
					7680: 270540800,
					7936: 2097160,
					4224: 8,
					4480: 2105344,
					4736: 2097152,
					4992: 268435464,
					5248: 268443648,
					5504: 8200,
					5760: 270540808,
					6016: 270532608,
					6272: 270540800,
					6528: 270532616,
					6784: 8192,
					7040: 2105352,
					7296: 2097160,
					7552: 0,
					7808: 268435456,
					8064: 268443656
				}, {
					0: 1048576,
					16: 33555457,
					32: 1024,
					48: 1049601,
					64: 34604033,
					80: 0,
					96: 1,
					112: 34603009,
					128: 33555456,
					144: 1048577,
					160: 33554433,
					176: 34604032,
					192: 34603008,
					208: 1025,
					224: 1049600,
					240: 33554432,
					8: 34603009,
					24: 0,
					40: 33555457,
					56: 34604032,
					72: 1048576,
					88: 33554433,
					104: 33554432,
					120: 1025,
					136: 1049601,
					152: 33555456,
					168: 34603008,
					184: 1048577,
					200: 1024,
					216: 34604033,
					232: 1,
					248: 1049600,
					256: 33554432,
					272: 1048576,
					288: 33555457,
					304: 34603009,
					320: 1048577,
					336: 33555456,
					352: 34604032,
					368: 1049601,
					384: 1025,
					400: 34604033,
					416: 1049600,
					432: 1,
					448: 0,
					464: 34603008,
					480: 33554433,
					496: 1024,
					264: 1049600,
					280: 33555457,
					296: 34603009,
					312: 1,
					328: 33554432,
					344: 1048576,
					360: 1025,
					376: 34604032,
					392: 33554433,
					408: 34603008,
					424: 0,
					440: 34604033,
					456: 1049601,
					472: 1024,
					488: 33555456,
					504: 1048577
				}, {
					0: 134219808,
					1: 131072,
					2: 134217728,
					3: 32,
					4: 131104,
					5: 134350880,
					6: 134350848,
					7: 2048,
					8: 134348800,
					9: 134219776,
					10: 133120,
					11: 134348832,
					12: 2080,
					13: 0,
					14: 134217760,
					15: 133152,
					2147483648: 2048,
					2147483649: 134350880,
					2147483650: 134219808,
					2147483651: 134217728,
					2147483652: 134348800,
					2147483653: 133120,
					2147483654: 133152,
					2147483655: 32,
					2147483656: 134217760,
					2147483657: 2080,
					2147483658: 131104,
					2147483659: 134350848,
					2147483660: 0,
					2147483661: 134348832,
					2147483662: 134219776,
					2147483663: 131072,
					16: 133152,
					17: 134350848,
					18: 32,
					19: 2048,
					20: 134219776,
					21: 134217760,
					22: 134348832,
					23: 131072,
					24: 0,
					25: 131104,
					26: 134348800,
					27: 134219808,
					28: 134350880,
					29: 133120,
					30: 2080,
					31: 134217728,
					2147483664: 131072,
					2147483665: 2048,
					2147483666: 134348832,
					2147483667: 133152,
					2147483668: 32,
					2147483669: 134348800,
					2147483670: 134217728,
					2147483671: 134219808,
					2147483672: 134350880,
					2147483673: 134217760,
					2147483674: 134219776,
					2147483675: 0,
					2147483676: 133120,
					2147483677: 2080,
					2147483678: 131104,
					2147483679: 134350848
				}],
				u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
				n = t.DES = i.extend({
					_doReset: function () {
						for (var e = this._key.words, t = [], i = 0; i < 56; i++) {
							var r = d[i] - 1;
							t[i] = e[r >>> 5] >>> 31 - r % 32 & 1
						}
						for (var n = this._subKeys = [], o = 0; o < 16; o++) {
							for (var s = n[o] = [], a = h[o], i = 0; i < 24; i++) s[i / 6 | 0] |= t[(l[i] - 1 + a) % 28] << 31 - i % 6, s[4 + (i / 6 | 0)] |= t[28 + (l[i + 24] - 1 + a) % 28] << 31 - i % 6;
							s[0] = s[0] << 1 | s[0] >>> 31;
							for (i = 1; i < 7; i++) s[i] = s[i] >>> 4 * (i - 1) + 3;
							s[7] = s[7] << 5 | s[7] >>> 27
						}
						for (var c = this._invSubKeys = [], i = 0; i < 16; i++) c[i] = n[15 - i]
					},
					encryptBlock: function (e, t) {
						this._doCryptBlock(e, t, this._subKeys)
					},
					decryptBlock: function (e, t) {
						this._doCryptBlock(e, t, this._invSubKeys)
					},
					_doCryptBlock: function (e, t, i) {
						this._lBlock = e[t], this._rBlock = e[t + 1], _.call(this, 4, 252645135), _.call(this, 16, 65535), p.call(this, 2, 858993459), p.call(this, 8, 16711935), _.call(this, 1, 1431655765);
						for (var r = 0; r < 16; r++) {
							for (var n = i[r], o = this._lBlock, s = this._rBlock, a = 0, c = 0; c < 8; c++) a |= f[c][((s ^ n[c]) & u[c]) >>> 0];
							this._lBlock = s, this._rBlock = o ^ a
						}
						var d = this._lBlock;
						this._lBlock = this._rBlock, this._rBlock = d, _.call(this, 1, 1431655765), p.call(this, 8, 16711935), p.call(this, 2, 858993459), _.call(this, 16, 65535), _.call(this, 4, 252645135), e[t] = this._lBlock, e[t + 1] = this._rBlock
					},
					keySize: 2,
					ivSize: 2,
					blockSize: 2
				});

			function _(e, t) {
				t = (this._lBlock >>> e ^ this._rBlock) & t;
				this._rBlock ^= t, this._lBlock ^= t << e
			}

			function p(e, t) {
				t = (this._rBlock >>> e ^ this._lBlock) & t;
				this._lBlock ^= t, this._rBlock ^= t << e
			}
			e.DES = i._createHelper(n);
			t = t.TripleDES = i.extend({
				_doReset: function () {
					var e = this._key.words;
					if (2 !== e.length && 4 !== e.length && e.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
					var t = e.slice(0, 2),
						i = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4),
						e = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
					this._des1 = n.createEncryptor(r.create(t)), this._des2 = n.createEncryptor(r.create(i)), this._des3 = n.createEncryptor(r.create(e))
				},
				encryptBlock: function (e, t) {
					this._des1.encryptBlock(e, t), this._des2.decryptBlock(e, t), this._des3.encryptBlock(e, t)
				},
				decryptBlock: function (e, t) {
					this._des3.decryptBlock(e, t), this._des2.encryptBlock(e, t), this._des1.decryptBlock(e, t)
				},
				keySize: 6,
				ivSize: 2,
				blockSize: 2
			});
			e.TripleDES = i._createHelper(t)
		}(), o.TripleDES));
		var o
	}
	var lt, ht = {
		exports: {}
	};

	function ft() {
		return lt ? ht.exports : (lt = 1, ht.exports = (o = V(), ee(), re(), Ne(), Ce(), function () {
			var e = o,
				t = e.lib.StreamCipher,
				i = e.algo,
				r = i.RC4 = t.extend({
					_doReset: function () {
						for (var e = this._key, t = e.words, i = e.sigBytes, r = this._S = [], n = 0; n < 256; n++) r[n] = n;
						for (var n = 0, o = 0; n < 256; n++) {
							var s = n % i,
								s = t[s >>> 2] >>> 24 - s % 4 * 8 & 255,
								o = (o + r[n] + s) % 256,
								s = r[n];
							r[n] = r[o], r[o] = s
						}
						this._i = this._j = 0
					},
					_doProcessBlock: function (e, t) {
						e[t] ^= n.call(this)
					},
					keySize: 8,
					ivSize: 0
				});

			function n() {
				for (var e = this._S, t = this._i, i = this._j, r = 0, n = 0; n < 4; n++) {
					var i = (i + e[t = (t + 1) % 256]) % 256,
						o = e[t];
					e[t] = e[i], e[i] = o, r |= e[(e[t] + e[i]) % 256] << 24 - 8 * n
				}
				return this._i = t, this._j = i, r
			}
			e.RC4 = t._createHelper(r);
			i = i.RC4Drop = r.extend({
				cfg: r.cfg.extend({
					drop: 192
				}),
				_doReset: function () {
					r._doReset.call(this);
					for (var e = this.cfg.drop; 0 < e; e--) n.call(this)
				}
			});
			e.RC4Drop = t._createHelper(i)
		}(), o.RC4));
		var o
	}
	var ut, _t = {
		exports: {}
	};

	function pt() {
		return ut ? _t.exports : (ut = 1, _t.exports = (r = V(), ee(), re(), Ne(), Ce(), function () {
			var e = r,
				t = e.lib.StreamCipher,
				i = e.algo,
				n = [],
				s = [],
				a = [],
				i = i.Rabbit = t.extend({
					_doReset: function () {
						for (var e = this._key.words, t = this.cfg.iv, i = 0; i < 4; i++) e[i] = 16711935 & (e[i] << 8 | e[i] >>> 24) | 4278255360 & (e[i] << 24 | e[i] >>> 8);
						for (var r = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], i = this._b = 0; i < 4; i++) c.call(this);
						for (i = 0; i < 8; i++) n[i] ^= r[i + 4 & 7];
						if (t) {
							var o = t.words,
								s = o[0],
								a = o[1],
								t = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
								o = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
								s = t >>> 16 | 4294901760 & o,
								a = o << 16 | 65535 & t;
							n[0] ^= t, n[1] ^= s, n[2] ^= o, n[3] ^= a, n[4] ^= t, n[5] ^= s, n[6] ^= o, n[7] ^= a;
							for (i = 0; i < 4; i++) c.call(this)
						}
					},
					_doProcessBlock: function (e, t) {
						var i = this._X;
						c.call(this), n[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, n[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, n[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, n[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
						for (var r = 0; r < 4; r++) n[r] = 16711935 & (n[r] << 8 | n[r] >>> 24) | 4278255360 & (n[r] << 24 | n[r] >>> 8), e[t + r] ^= n[r]
					},
					blockSize: 4,
					ivSize: 2
				});

			function c() {
				for (var e = this._X, t = this._C, i = 0; i < 8; i++) s[i] = t[i];
				t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
				for (i = 0; i < 8; i++) {
					var r = e[i] + t[i],
						n = 65535 & r,
						o = r >>> 16;
					a[i] = ((n * n >>> 17) + n * o >>> 15) + o * o ^ ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0)
				}
				e[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0, e[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0, e[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0, e[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0, e[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0, e[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0, e[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0, e[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0
			}
			e.Rabbit = t._createHelper(i)
		}(), r.Rabbit));
		var r
	}
	var gt, mt, yt, vt, At, wt, It = {
		exports: {}
	};

	function Et() {
		return gt ? It.exports : (gt = 1, It.exports = (r = V(), ee(), re(), Ne(), Ce(), function () {
			var e = r,
				t = e.lib.StreamCipher,
				i = e.algo,
				n = [],
				s = [],
				a = [],
				i = i.RabbitLegacy = t.extend({
					_doReset: function () {
						for (var e = this._key.words, t = this.cfg.iv, i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16], r = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]], n = this._b = 0; n < 4; n++) c.call(this);
						for (n = 0; n < 8; n++) r[n] ^= i[n + 4 & 7];
						if (t) {
							var o = t.words,
								s = o[0],
								e = o[1],
								t = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
								o = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8),
								s = t >>> 16 | 4294901760 & o,
								e = o << 16 | 65535 & t;
							r[0] ^= t, r[1] ^= s, r[2] ^= o, r[3] ^= e, r[4] ^= t, r[5] ^= s, r[6] ^= o, r[7] ^= e;
							for (n = 0; n < 4; n++) c.call(this)
						}
					},
					_doProcessBlock: function (e, t) {
						var i = this._X;
						c.call(this), n[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, n[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, n[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, n[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
						for (var r = 0; r < 4; r++) n[r] = 16711935 & (n[r] << 8 | n[r] >>> 24) | 4278255360 & (n[r] << 24 | n[r] >>> 8), e[t + r] ^= n[r]
					},
					blockSize: 4,
					ivSize: 2
				});

			function c() {
				for (var e = this._X, t = this._C, i = 0; i < 8; i++) s[i] = t[i];
				t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < s[7] >>> 0 ? 1 : 0;
				for (i = 0; i < 8; i++) {
					var r = e[i] + t[i],
						n = 65535 & r,
						o = r >>> 16;
					a[i] = ((n * n >>> 17) + n * o >>> 15) + o * o ^ ((4294901760 & r) * r | 0) + ((65535 & r) * r | 0)
				}
				e[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0, e[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0, e[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0, e[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0, e[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0, e[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0, e[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0, e[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0
			}
			e.RabbitLegacy = t._createHelper(i)
		}(), r.RabbitLegacy));
		var r
	}
	var Bt, xt, St, Rt = i.exports = (i = V(), j(), $(), J(), ee(), re(), se(), de(), fe(), pe(), ye(), we(), Be(), Re(), Oe(), Ne(), Ce(), Me(), Ve(), je(), $e(), Ke || (Ke = 1, wt = V(), Ce(), wt.mode.ECB = function () {
		var e = wt.lib.BlockCipherMode.extend();
		return e.Encryptor = e.extend({
			processBlock: function (e, t) {
				this._cipher.encryptBlock(e, t)
			}
		}), e.Decryptor = e.extend({
			processBlock: function (e, t) {
				this._cipher.decryptBlock(e, t)
			}
		}), e
	}(), wt.mode.ECB), Xe || (Xe = 1, At = V(), Ce(), At.pad.AnsiX923 = {
		pad: function (e, t) {
			var i = e.sigBytes,
				t = 4 * t,
				t = t - i % t,
				i = i + t - 1;
			e.clamp(), e.words[i >>> 2] |= t << 24 - i % 4 * 8, e.sigBytes += t
		},
		unpad: function (e) {
			var t = 255 & e.words[e.sigBytes - 1 >>> 2];
			e.sigBytes -= t
		}
	}, At.pad.Ansix923), Je || (Je = 1, vt = V(), Ce(), vt.pad.Iso10126 = {
		pad: function (e, t) {
			t *= 4, t -= e.sigBytes % t;
			e.concat(vt.lib.WordArray.random(t - 1)).concat(vt.lib.WordArray.create([t << 24], 1))
		},
		unpad: function (e) {
			var t = 255 & e.words[e.sigBytes - 1 >>> 2];
			e.sigBytes -= t
		}
	}, vt.pad.Iso10126), Ze || (Ze = 1, yt = V(), Ce(), yt.pad.Iso97971 = {
		pad: function (e, t) {
			e.concat(yt.lib.WordArray.create([2147483648], 1)), yt.pad.ZeroPadding.pad(e, t)
		},
		unpad: function (e) {
			yt.pad.ZeroPadding.unpad(e), e.sigBytes--
		}
	}, yt.pad.Iso97971), Qe || (Qe = 1, mt = V(), Ce(), mt.pad.ZeroPadding = {
		pad: function (e, t) {
			t *= 4;
			e.clamp(), e.sigBytes += t - (e.sigBytes % t || t)
		},
		unpad: function (e) {
			for (var t = e.words, i = e.sigBytes - 1, i = e.sigBytes - 1; 0 <= i; i--)
				if (t[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
					e.sigBytes = i + 1;
					break
				}
		}
	}, mt.pad.ZeroPadding), et || (et = 1, mt = V(), Ce(), mt.pad.NoPadding = {
		pad: function () { },
		unpad: function () { }
	}, mt.pad.NoPadding), rt(), st(), dt(), ft(), pt(), Et(), i);
	(Bt = Bt = Bt || {}).DEBUG = "debug", Bt.STAGE = "stage", Bt.PROD = "prod", (xt = xt = xt || {})[xt.AdTypeEnumNull = 0] = "AdTypeEnumNull", xt[xt.Display = 1] = "Display", xt[xt.Float = 2] = "Float", xt[xt.Banner = 3] = "Banner", xt[xt.Interstitial = 4] = "Interstitial", xt[xt.Rewarded = 5] = "Rewarded";
	class Dt { }
	Dt.ADFLY_REPORT_URL = "https://cpl.minigame.work:19443/v1/event-publish/api/event/publish", Dt.ADFLY_REPORT_DOMAIN = "https://ingress.minigame.vip:30443", Dt.ADFLY_REPORT_PUBLISH = "v1/event-publish/api/event/publish";
	(Gt = Gt = Gt || {}).json = "application/json", Gt.form = "application/x-www-form-urlencoded; charset=UTF-8", (Gt = St = St || {}).get = "GET", Gt.post = "POST";
	class bt {
		onGameEvent(t) {
			const i = new URLSearchParams(window.location.search);
			if (i.has("clickid")) {
				var r = i.get("clickid");
				let e = "";
				i.has("gaid") && (e = i.get("gaid"));
				const n = {};
				n.subject = t.eventName, t.label && (n.eventValue = t.label);
				const o = {};
				o.channelId = T.getChannelName(), o.gameId = T.minigameOption.game_id, o.clickId = r, o.event = n, o.ts = `${class { static getTimestamp() { return (new Date).getTime() } static getTimeBySecond() { return Math.floor((new Date).getTime() / 1e3) } static getDate() { return (new Date).toLocaleDateString() } static getTargetTimestamp(e = 0, t = 0, i = 0) { var r = new Date((new Date).toLocaleDateString()).getTime(); return new Date(r + 1e3 * (3600 * e + 60 * t + i)).getTime() } static waitTime(t, i) { return new Promise(e => { setTimeout(() => { i && i(), e() }, t) }) } }.getTimeBySecond()}`, 0 < e.length && (o.gaid = e), this.reportToMinigameEventGateway(o), console.info("====> reportModel: ", o)
			} else console.error("location search hasn't clickid field")
		}
		reportToMinigameEventGateway(l) {
			return t(this, void 0, void 0, function* () {
				var e = St.post,
					t = (new Date).toUTCString().toString();
				const i = Rt.SHA256,
					r = Rt.enc.Base64,
					n = Rt.HmacSHA512;
				var o = l,
					s = `SHA-256=${r.stringify(i(JSON.stringify(o)))}`,
					a = r.stringify(n(`(request-target): post /${Dt.ADFLY_REPORT_PUBLISH}\nx-date: ${t}\ndigest: ${s}`, "HMACSHA512-SecretKey"));
				const c = new Headers;
				c.append("Authorization", `Signature keyId="write",algorithm="hmac-sha512",headers="(request-target) x-date digest",signature="${a}"`), c.append("Content-Type", "application/json"), c.append("x-date", t), c.append("digest", s);
				e = {
					method: e,
					headers: c,
					body: JSON.stringify(o)
				};
				const d = `${Dt.ADFLY_REPORT_DOMAIN}/${Dt.ADFLY_REPORT_PUBLISH}`;
				console.info("=====> reportToMinigameEventGateway: ", JSON.stringify(o)), yield fetch(d, e).then(e => {
					e.ok ? (e.json(), console.info(`====> reportToMinigameEventGateway post ${d} success response: ${JSON.stringify(e.json())}`)) : console.error(`====> reportToMinigameEventGateway post ${d} fail status: ${e.status}`)
				}).catch(e => {
					console.error("====> reportToMinigameEventGateway setData error: " + e.message)
				})
			})
		}
	}
	class Ot {
		constructor() {
			this._curReport = null, this._curReport = new bt
		}
		static get instance() {
			return this._instance || (this._instance = new Ot), this._instance
		}
		onGameEvent(e) {
			e ? this._curReport ? this._curReport.onGameEvent(e) : console.error("cur report instance is null") : console.error("report event is null")
		}
	}
	Ot._instance = null;
	const Tt = Ot.instance;
	class kt extends k {
		static createRequest(e) {
			return {
				type: kt.requestType,
				payload: e
			}
		}
		static createService() {
			return new kt(kt.requestType, !1, kt.handleRequestAsync)
		}
		static handleRequestAsync(e) {
			return Tt.onGameEvent(e.payload), Promise.resolve(L(e))
		}
	}
	kt.requestType = "GameEventReportService";
	let Nt = document;

	function Lt(o, s = !1, a) {
		return t(this, void 0, void 0, function* () {
			return new Promise((e, t) => {
				const i = Nt.createElement("script");
				if (i.src = o, i.async = s, a)
					for (const n in a) i.setAttribute(n, a[n]);
				const r = () => {
					i.removeEventListener("load", r), e()
				};
				i.addEventListener("load", r), i.addEventListener("error", e => {
					console.error(e), t(new Error(`Failed to load ${o}`))
				}), (Nt.getElementsByTagName("head")[0] || document.documentElement).appendChild(i)
			})
		})
	}

	function Pt(i) {
		return t(this, void 0, void 0, function* () {
			let t = zt;
			try {
				const e = yield fetch(i);
				return 404 === e.status ? Promise.reject({
					message: `${i} not found`
				}) : (t = yield e.json(), console.info("config loaded:", t), Promise.resolve(t))
			} catch (e) {
				return console.info("use default config: ", t), Promise.reject({
					message: "load config failed: " + e
				})
			}
		})
	}

	function Ct(i) {
		return t(this, void 0, void 0, function* () {
			let t = zt;
			try {
				var e = (n = i, yield new Promise((t, i) => {
					const r = new XMLHttpRequest;
					r.open("GET", n), r.onload = function () {
						var e;
						200 === r.status ? (e = JSON.parse(r.responseText), console.info("config loaded:", e), t(e)) : i({
							message: `fail to get config data from ${n}`
						})
					}, r.onerror = function () {
						i({
							message: "fail to get config data from : " + r.statusText
						})
					}, r.send()
				}));
				return t = e, console.info("config loaded with XHR:", t), Promise.resolve(t)
			} catch (e) {
				return console.info("use default config with XHR: ", t), Promise.reject({
					message: "load config failed width XHR: " + e
				})
			}
			var n
		})
	}

	function Ht(i) {
		return t(this, void 0, void 0, function* () {
			try {
				if (window.minigamePlatform = i.platform, window.minigameConfig = i.features, i && i.sdk) {
					yield Lt(i.sdk);
					var e = i.instance || zt.instance;
					const t = window[e];
					return t && t.initializeAsync ? (window.minigameLoader = t, window.minigame = t, t.initializeAsync()) : Promise.reject({
						message: "sdk instance not found: " + e
					})
				}
				return Promise.reject({
					message: "sdk url is not defined: " + i
				})
			} catch (e) {
				return Promise.reject({
					message: "load platform failed: " + e
				})
			}
		})
	}
	const Ft = class Wt {
		constructor() {
			this._gameName = "", this._enabled = !0, this._commonInfo = null
		}
		static get instance() {
			return this._instance || (this._instance = new Wt), this._instance
		}
		initGa(e) {
			function t() {
				window.dataLayer.push(arguments)
			}
			window.dataLayer = window.dataLayer || [], window.gaLog = window.gtag || t;
			var i = e.config.gid;
			i ? (console.info("[minigame] init ga with id: " + i), Lt("https://www.googletagmanager.com/gtag/js?id=" + i, !0, e.attributes).then(() => { }).catch(e => {
				console.error("[minigame] init ga error: ", e)
			}), t("js", new Date), t("config", i, {
				cookie_flags: "max-age=7200;secure;samesite=none"
			})) : console.warn("[minigame] ga with invalid id: " + i)
		}
		init(e, t, i) {
			try {
				if (!e || !e.enabled) return console.info("====> ga is disabled"), void (this._enabled = !1);
				if (this._enabled = e.enabled, this._gameName = t, e.isDefault) return void this.initGa(e);
				if (i) return;
				console.info(`====> gameName: ${this._gameName}`), this._commonInfo = H.commonInfo;
				var r = this._commonInfo._minigameOption.ga.config.gid;
				console.info("====> commonInfo: ", this._commonInfo), this.initGa(0 === r.length ? e : this._commonInfo._minigameOption.ga)
			} catch (e) {
				this._enabled = !1, console.error("Fail to load init Analytics", e)
			}
		}
		isH5AndroidApp() {
			return !!this._commonInfo && !!this._commonInfo._minigameOption && !!this._commonInfo._minigameOption.android && this._commonInfo._minigameOption.android.enabled
		}
		isAdflyCplEnable() {
			return !!this._commonInfo && !!this._commonInfo._minigameOption && !!this._commonInfo._minigameOption.cpl && !!this._commonInfo._minigameOption.cpl.adflyer && this._commonInfo._minigameOption.cpl.adflyer.enabled
		}
		onGameEvent(r, n, o) {
			return t(this, void 0, void 0, function* () {
				if (this._enabled) {
					const t = window.mediationClient;
					if (H.isH5Android()) try {
						yield t.invokeServiceAsync(F.createRequest(r))
					} catch (e) {
						console.error(`android track event error: ${e}`)
					} else {
						try {
							const i = window.gaLog;
							i("event", r, {
								event_category: o || `game_${this._gameName}`,
								event_label: n
							}), console.info(`gtag event action = ${r}, label = ${n}`)
						} catch (e) {
							console.error("gtag error: ", e)
						}
						try {
							var e;
							H.isAdflyCplEnable() ? (e = {
								eventName: r,
								label: n
							}, yield t.invokeServiceAsync(kt.createRequest(e))) : console.info("adflyer cpl is disable")
						} catch (e) {
							console.error(`game report service invoked error: ${e.message}`)
						}
					}
				} else console.info("====> onGameEvent is disabled")
			})
		}
	}.instance,
		Mt = {
			LOCAL: "local",
			MINIGAME: "minigame",
			FBIG: "fbig",
			CHALLENGE: "challenge",
			MATCH: "match"
		},
		zt = {
			platform: Mt.LOCAL,
			sdk: "minigame-sdk.js",
			instance: "FBInstant",
			gameName: "minigame",
			features: {
				ads: {
					enabled: !0,
					isTest: !0,
					isAndroidApp: !1,
					config: {
						banner: "4864743603539728_5082905605056859",
						interstitial: "4864743603539728_5070034729677280",
						rewarded_video: "4864743603539728_5070034119677341",
						rewarded_interstitial: "4864743603539728_5070034119677341"
					},
					options: {
						fb_max_ad_instance: 3,
						fb_init_ad_count: 3,
						fb_banner_refresh_interval: 0,
						fb_interstitial_refresh_interval: 0,
						fb_rewarded_video_refresh_interval: 0,
						fb_max_banner_error: 1,
						fb_max_interstitial_error: 3,
						fb_max_rewarded_video_error: 3,
						fb_auto_load_on_play: !0,
						fb_auto_reload_delay: 1,
						fb_ad_delay_for_first_banner: 0,
						fb_ad_delay_for_first_interstitial: 0,
						fb_ad_delay_for_first_rewarded_video: 0
					}
				},
				leaderboard: {
					enabled: !1
				},
				ga: {
					enabled: !0,
					isDefault: !1,
					config: {
						gid: "UA-213371115-3"
					}
				}
			}
		};
	var Gt = {
		version: "1.0.12",
		inited: !1,
		initializeAsync: function (n) {
			return t(this, void 0, void 0, function* () {
				if (this.inited) return console.warn("minigame sdk already inited"), Promise.reject({
					message: "minigame sdk already inited"
				});
				this.inited = !0, console.info("minigame loader started...");
				var e = n || "minigame.json";
				let t;
				try {
					t = window.AdInteractive ? yield Ct(e) : yield Pt(e)
				} catch (e) {
					return Promise.reject({
						message: "minigame sdk load config failed: " + e.message
					})
				}
				try {
					yield Ht(t)
				} catch (e) {
					return Promise.reject({
						message: "minigame sdk init failed: " + e.message
					})
				}
				if (console.info("minigame loader inited..."), !t.features || !t.features.ads) return console.info("missing features or missing ads"), Promise.reject({
					message: "missing features or missing ads"
				});
				return /*window.Analytics = Ft, window.MiniGameAnalytics = Ft,*/ Promise.resolve()

				/*t.platform !== Mt.FBIG && t.platform !== Mt.MINIGAME || (b.load(t.features.ads), window.MiniGameAds = b, window.MinigameAds = b);
				e = t.features.ads.isTest;
				if (!e && t.platform !== Mt.FBIG) try {
					yield H.init()
				} catch (e) {
					console.error("MiniGameInfo init fail: ", e)
				}
				window.MiniGameInfo = H;
				try {
					var i = t.features.ga || zt.features.ga,
						r = t.gameName || zt.gameName;
					yield Ft.init(i, r, e)
				} catch (e) {
					console.error("MiniGameAnalytics init fail: ", e)
				}
				return window.Analytics = Ft, window.MiniGameAnalytics = Ft, Promise.resolve()*/
			})
		},
		setLoadingProgress: function (e) {
			throw {
				code: r.CODE.NOT_READY,
				message: "minigameLoader.setLoadingProgress not injected"
			}
		},
		startGameAsync: function () {
			throw {
				code: r.CODE.NOT_READY,
				message: "minigameLoader.startGameAsync not injected"
			}
		}
	};
	console.info("minigame sdk: " + Gt.version), window.FBInstant = Gt, window.minigame = Gt, e.MINIGAME_DEFAULT_CONFIG = zt, e.MINIGAME_PLATFORM = Mt, e.loadConfigAsync = Pt, e.loadPlatformAndInitAsync = Ht, e.minigameLoader = Gt, Object.defineProperty(e, "__esModule", {
		value: !0
	})
});