import {IInputs, IOutputs} from "./generated/ManifestTypes";
import copy from 'copy-to-clipboard';

export class CopyToClipboard implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _Content:string|null;

	private _commandButton:HTMLAnchorElement;
	private img:HTMLImageElement
	 // Power Apps component framework delegate which will be assigned to this object which would be called whenever any update happens.
	 private _notifyOutputChanged: () => void;

	 //private _commandButton: HTMLButtonElement;
	 // reference to the component container HTMLDivElement
	 // This element contains all elements of our code component example
	 private _container: HTMLDivElement;
	 // reference to Power Apps component framework Context object
	 private _context: ComponentFramework.Context<IInputs>;
	 // Event Handler 'refreshData' reference
	 private _refreshData: EventListenerOrEventListenerObject;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		this._Content=context.parameters.content.raw;
		// Add control initialization code
		
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		//this._refreshData = this.refreshData.bind(this);
		this.img=document.createElement("img");
		this.img.src=this.getImageSource();
		this._commandButton=document.createElement("a");
		this._commandButton.innerHTML=this.img.outerHTML;
		this._commandButton.title="Copy to clipboard";
		this._commandButton.href="#";

		this._commandButton.onclick=()=>{
			this.CopyToClipboard(this._Content);

		}

		this._container.append(this._commandButton);
		container.append(this._container);
	}
	
	private getImageSource(): string
	{
	return  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABGUlEQVRIibWUPQoCMRBGn2Ih2AoWrqUewN4TeABB8BxWdnaCB/GnEz2A11DwAharB1iLjRDXiZnsxoFhF5Jv3kz4EsgjAbbAA8gKeQOmRIgEuAuAYs6rgram0AHoCusjC7asAnofV+JYb/I52bos6F3At+cCTID2P0FXoENF02hAQyKYRgOCCKYpgqQuIYJptCCtaexc/QL5ioSAMmDhKlBlorNDP4sNsqMFjI3mVrPENY+wuM8H/djX+FFQEpUOCaSNILgE0hZwHZ2orwNP8++6iNFiT97d0QMLdd2XboD/sZRAvsdVbDABNkD6L1CIc7T3TdTVAwRlTNMz3zRAozaNDTkZzS4EpDGNlHegHwICv2nsTM0kfYAXoXXQ8XYfZLoAAAAASUVORK5CYII=";
	}
	
	public CopyToClipboard(val:string|null)
	{
		if(this._Content !== null && this._Content !== "")
			copy(this._Content);
		//else
			//alert("No data to copy");	
	}
	/**
   * Updates the values to the internal value variable we are storing and also updates the html label that displays the value
   * @param context : The "Input Properties" containing the parameters, component metadata and interface functions
   */
	public refreshData(evt: Event): void {
		this._Content=this._context.parameters.content.raw;
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._Content=context.parameters.content.raw;
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
