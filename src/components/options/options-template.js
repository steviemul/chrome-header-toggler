export default `
  <div class="row">
    <form class="col s12">
      <div class="row">
          <div class="col s12">
          <label>Description</label>
          <input type="text" data-bind="description">
        </div>
        <div class="col s12">
          <label>Host/s</label>
          <input type="text" data-bind="host" required>
        </div>
      </div>
      <div class="row section-label">
        <div class="col s12">
          <h6>Header Details</h6>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <label>Header Name</label>
          <input type="text" data-bind="header">
        </div>
        <div class="col s6">
          <label>Option Name</label>
          <input type="text" data-bind="value">
        </div>
      </div>

      <div class="row section-label">
        <div class="col s12">
          <h6>On</h6>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <label>Option Value</label>
          <input type="text" data-bind="on.value">
        </div>
        <div class="col s6">
          <label>Option Text</label>
          <input type="text" data-bind="on.text">
        </div>
      </div>

      <div class="row section-label">
        <div class="col s12">
          <h6>Off</h6>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <label>Option Value</label>
          <input type="text" data-bind="off.value">
        </div>
        <div class="col s6">
          <label>Option Text</label>
          <input type="text" data-bind="off.text">
        </div>
      </div>
    </form>
  </div>
`;